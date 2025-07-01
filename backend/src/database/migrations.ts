import BaseDatabase from "../class/BaseDatabase"
import { classicCoffees, ingredients } from "../data/data"

const printError = (err: any) => { console.log(err.sqlMessage || err.message) }

const createTable = async () => {
    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS classic_coffees (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            ingredients TEXT[] NOT NULL,
            price NUMERIC(10,2) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP
        );
    `)

    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS customers (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(80) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP
        );
    `)

    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS ingredients (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            type VARCHAR(50) NOT NULL, -- 'basic' ou 'extra',
            price NUMERIC(10,2) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP             
        );
    `)

    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS orders (
            id VARCHAR(100) PRIMARY KEY,
            total_value NUMERIC(10,2) NOT NULL,
            extra_ingredients TEXT[],
            fk_classic_coffees VARCHAR(100),
            fk_customers VARCHAR(100),
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP,  
            FOREIGN KEY (fk_classic_coffees) REFERENCES classic_coffees(id),
            FOREIGN KEY (fk_customers) REFERENCES customers(id)                
        );
    `)

    for (const classicCoffee of classicCoffees) {
        await BaseDatabase.connection("classic_coffees").insert({
            id: classicCoffee.id,
            name: classicCoffee.name,
            ingredients: classicCoffee.ingredients,
            price: classicCoffee.price,
            created_at: classicCoffee.created_at,
        });
    }

    for (const ingredient of ingredients) {
        await BaseDatabase.connection("ingredients").insert({
            id: ingredient.id,
            name: ingredient.ingredient_name,
            type: ingredient.ingredient_type,
            price: ingredient.price,
            created_at: ingredient.created_at,
        });
    }
}

const finish = async () => await BaseDatabase.connection.destroy()

createTable()
    .then(() => console.log("Success."))
    .catch((err) => printError(err))
    .finally(finish)