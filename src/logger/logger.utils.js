import { env } from "../common/config.js"
import { cache } from "./logger.store.js"
import rTracer from "cls-rtracer"
import Pino from "pino"

const isProd = env === "production"

const transport = isProd ? undefined : { target: "pino-pretty" }

const logger = new Pino({ transport, timestamp: false })

const getLog = () => {
	const reqId = rTracer.id()

	if (!reqId) return null

	const log = cache.get(reqId)

	return log ? log : null
}

const addLog = (key, data) => {
	const log = getLog()

	if (!log) return

	log[key] = data

	const reqId = rTracer.id()

	cache.set(reqId, log)
}

const addDbLog = data => {
	const log = getLog()

	if (!log) return

	const db = log.database || []

	db.push(data)

	log.database = db

	const reqId = rTracer.id()

	cache.set(reqId, log)
}

export { logger, addLog, addDbLog }
