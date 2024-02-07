import { promiseWrapper } from "../common/utils.js"
import { candidates } from "../database/schema.js"
import { db } from "../database/database.js"
import { eq } from "drizzle-orm"

const findAll = async () => {
	const query = db.select().from(candidates)

	const { result, error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	return { status: 200, data: result }
}

const find = async ({ params }) => {
	const { id } = params

	const query = db.select().from(candidates).where(eq(candidates.id, id))

	const { result, error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	return { status: 200, data: result }
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

	const { error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	const message = `Candidate with id ${params.id} updated`

	return { status: 200, data: { message } }
}

const remove = async ({ params }) => {
	const query = db.delete(candidates).where(eq(candidates.id, params.id))

	const { error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	return { status: 204, data: {} }
}

export { findAll, create, find, update, remove }
