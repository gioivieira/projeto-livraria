import BaseDatabase from "../class/BaseDatabase"
import { books } from "../data/data"

const printError = (err: any) => { console.log(err.sqlMessage || err.message) }

const createTable = async () => {
    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS books (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(150) NOT NULL UNIQUE,
            synopsis TEXT NOT NULL,
            author VARCHAR(150) NOT NULL,
            price NUMERIC(10,2) NOT NULL,
            quantity NUMERIC(4, 0) NOT NULL,
            evaluation_note NUMERIC(2,1),
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP
        );
    `)

    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS customers (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP
        );
    `)

    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS orders (
            id VARCHAR(100) PRIMARY KEY,
            total_value NUMERIC(20,2),
            fk_customer VARCHAR(100) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP,  
            FOREIGN KEY (fk_customer) REFERENCES customers(id)                
        );
    `)

    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS order_items (
            id VARCHAR(100) PRIMARY KEY,
            quantity NUMERIC (4, 0) NOT NULL,
            unit_price NUMERIC(10,2) NOT NULL,
            fk_book VARCHAR(100) NOT NULL,
            fk_order VARCHAR(100) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP,  
            FOREIGN KEY (fk_book) REFERENCES books(id),
            FOREIGN KEY (fk_order) REFERENCES orders(id)                
        );
    `)

    for (const book of books) {
        await BaseDatabase.connection("books").insert({
            id: book.id,
            name: book.name,
            synopsis: book.synopsis,
            author: book.author,
            price: book.price,
            quantity: book.quantity,
            evaluation_note: book.evaluation_note,
            created_at: book.created_at,
        })
    }
}

const finish = async () => await BaseDatabase.connection.destroy()

createTable()
    .then(() => console.log("Success."))
    .catch((err) => printError(err))
    .finally(finish)