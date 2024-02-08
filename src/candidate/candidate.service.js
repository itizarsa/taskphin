import { promiseWrapper } from "../common/utils.js"
import { candidates } from "../database/schema.js"
import { db } from "../database/database.js"
import { eq } from "drizzle-orm"

const findAll = async ({ query }) => {
	const { page, limit } = query

	const offset = (page - 1) * limit

	const request = db.select().from(candidates).limit(limit).offset(offset)

	const { result, error } = await promiseWrapper(request)

	if (error) return { status: 500, error }

	return { status: 200, data: result }
}

const find = async ({ params }) => {
	const query = db.select().from(candidates).where(eq(candidates.id, params.id)).limit(1)

	const { result, error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	return { status: 200, data: result[0] }
}

const create = async ({ body }) => {
	const query = db.insert(candidates).values(body)

	const { result, error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	const candidateId = result[0].insertId

	const message = `Candidate with id ${candidateId} created`

	return { status: 201, data: { message } }
}

const update = async ({ params, body }) => {
	const query = db.update(candidates).set(body).where(eq(candidates.id, params.id))

	const { result, error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	const isSuccess = result[0].affectedRows > 0

	const msgSuffix = isSuccess ? "updated" : "not found"

	const message = `Candidate with id ${params.id} ${msgSuffix}`

	if (!isSuccess) return { status: 404, error: { message } }

	return { status: 200, data: { message } }
}

const remove = async ({ params }) => {
	const query = db.delete(candidates).where(eq(candidates.id, params.id))

	const { result, error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	const isSuccess = result[0].affectedRows > 0

	const message = `Candidate with id ${params.id} not found`

	if (!isSuccess) return { status: 404, error: { message } }

	return { status: 204, data: {} }
}

const score = async ({ params }) => {
	const criteria = {
		"Node.js": [
			{ yoe: 1, point: 1 },
			{ yoe: 2, point: 2 },
			{ yoe: Number.MAX_SAFE_INTEGER, point: 3 }
		],
		ReactJS: [
			{ yoe: 0.9, point: 1 },
			{ yoe: 2, point: 2 },
			{ yoe: Number.MAX_SAFE_INTEGER, point: 3 }
		]
	}

	const query = db
		.select({ skills: candidates.skills })
		.from(candidates)
		.where(eq(candidates.id, params.id))
		.limit(1)

	const { result, error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	if (!result.length)
		return { status: 404, error: { message: `Candidate with id ${params.id} not found` } }

	const { skills } = result[0]

	const totalScore = skills.reduce((total, skill) => {
		const { name, yoe } = skill

		const skillCriteria = criteria[name]

		if (!skillCriteria) return total

		const { point } = skillCriteria.find(({ yoe: criteriaYoe }) => yoe <= criteriaYoe)

		return total + point
	}, 0)

	return { status: 200, data: { score: totalScore } }
}

export { findAll, create, find, update, remove, score }
