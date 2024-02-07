import { loggerMiddleware } from "./logger/logger.middleware.js"
import { logger } from "./logger/logger.utils.js"
import { port } from "./common/config.js"
import { randomUUID } from "crypto"
import rTracer from "cls-rtracer"
import express from "express"

const app = express()

app.use(express.json({ limit: "10mb" }))

app.use(express.urlencoded({ extended: true, limit: "10mb" }))

app.use(rTracer.expressMiddleware({ requestIdFactory: () => randomUUID() }))

app.use(loggerMiddleware)

app.all("*", (req, res) => {
	return res.status(404).json({ message: `Cannot ${req.method} ${req.url}` })
})

app.listen(port, () => {
	console.log(`App listening on ${port}`)
})

process.on("unhandledRejection", error => {
	const { message, stack } = error

	logger.error({ type: "unhandledRejection", message: message || error, stack })
})

process.on("uncaughtException", (err, origin) => {
	logger.error({ type: "uncaughtException", err, origin })
})
