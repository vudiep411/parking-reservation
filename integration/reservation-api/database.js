import pkg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pkg

export const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.USER,
    password: process.env.PASSWORD,
    port: 5432
})
