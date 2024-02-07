import { cache } from "./logger.store.js"
import rTracer from "cls-rtracer"
import { logger } from "./logger.utils.js"

const loggerMiddleware = (req, res, next) => {
	if (req.method === "OPTIONS") return next()

	const reqId = rTracer.id()

	const startTime = Date.now()

	cache.set(reqId, {})

	res.on("finish", () => {
		const responseTime = Date.now() - startTime

		const fwd = req.headers["x-forwarded-for"]

		const message = `method=${req.method} url=${req.url} status=${res.statusCode} request_id=${reqId} fwd=${fwd}`

		const ip = req.headers["x-forwarded-for"]
			? req.headers["x-forwarded-for"].split(",")[0]
			: undefined

		const request = {
			ip,
			method: req.method,
			url: req.url,
			body: req.body,
			headers: req.headers,
			path: req.route?.path ?? req.path
		}

		const { database, ...context } = cache.take(reqId)

		const log = {
			reqId,
			context,
			database,
			req: request,
			statusCode: res.statusCode,
			responseTime,
			message
		}

		logger.info(log)
	})

	return next()
}

export { loggerMiddleware }
