import "dotenv/config"

export default {
	schema: "src/database/schema.js",
	out: "src/database/migration",
	driver: "mysql2",
	dbCredentials: {
		uri: process.env.DATABASE_URL
	}
}
