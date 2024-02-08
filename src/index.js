import candidate from "./candidate/candidate.route.js"
import { PORT } from "./common/config.js"
import express from "express"

const app = express()

app.use(express.json({ limit: "10mb" }))

app.use(express.urlencoded({ extended: true, limit: "10mb" }))

app.use("/candidates", candidate)

app.all("*", (req, res) => {
	return res.status(404).json({ message: `Cannot ${req.method} ${req.url}` })
})

app.listen(PORT, () => {
	console.log(`App listening on ${PORT}`)
})

process.on("unhandledRejection", error => {
	const { message, stack } = error

	console.error({ type: "unhandledRejection", message: message || error, stack })
})

process.on("uncaughtException", (err, origin) => {
	console.error({ type: "uncaughtException", err, origin })
})
