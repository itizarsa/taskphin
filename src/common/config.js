import "dotenv/config"
import { cleanEnv, str, port, url } from "envalid"

const env = cleanEnv(process.env, {
	PORT: port({ default: 7777 }),
	NODE_ENV: str({ choices: ["development", "production"], default: "development" }),
	DATABASE_URL: url()
})

const { PORT, NODE_ENV, DATABASE_URL } = env

export { PORT, NODE_ENV, DATABASE_URL }
