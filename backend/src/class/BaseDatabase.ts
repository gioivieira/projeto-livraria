import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

abstract class BaseDatabase {
    static connection = knex({
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: String(process.env.POSTGRES_PASSWORD),
            multipleStatements: true
        }
    })

    abstract TABLE_NAME: string

    public async getItems(){
        const result = await BaseDatabase.connection(this.TABLE_NAME).select("*")
        return result
    }

    public async getItem(column: string, value: string){
        const result = await BaseDatabase.connection(this.TABLE_NAME).select("*").whereLike(column, value)
        return result
    }

    public async updateItem(column: string, newInfo: any, id: string){
        await BaseDatabase.connection(this.TABLE_NAME).update(column, newInfo).whereLike("id", id)
    }

    public async createItem(item: any){
        await BaseDatabase.connection(this.TABLE_NAME).insert(item)
    }

    protected async deleteItem(id: string){
        await BaseDatabase.connection(this.TABLE_NAME).whereILike("id", id).del()
    }
}

export default BaseDatabase