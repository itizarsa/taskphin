import "dotenv/config"
import { migrate } from "drizzle-orm/mysql2/migrator"
import { db, connection } from "./database.js"

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "src/database/migration" })

// Don't forget to close the connection, otherwise the script will hang
await connection.end()
