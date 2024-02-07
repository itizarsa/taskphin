import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"

export const connection = await mysql.createConnection({ uri: DATABASE_URL })

export const db = drizzle(connection, { schema })
