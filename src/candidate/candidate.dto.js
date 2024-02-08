import { status } from "../database/schema.js"
import Joi from "joi"

const paginationDto = Joi.object({
	page: Joi.number().min(0).default(1),
	limit: Joi.number().min(0).max(25).default(25)
})

const idParamDto = Joi.object({
	id: Joi.number().min(0).required()
})

const skill = Joi.object({
	name: Joi.string().required(),
	yoe: Joi.number().min(0).required()
})

const createDto = Joi.object({
	fullName: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
	status: Joi.string()
		.valid(...status)
		.required(),
	expectedSalary: Joi.number().min(0).required(),
	skills: Joi.array().items(skill)
})

const updateDto = Joi.object({
	fullName: Joi.string(),
	email: Joi.string().email(),
	phone: Joi.string(),
	status: Joi.string().valid(...status),
	expectedSalary: Joi.number().min(0),
	skills: Joi.array().items(skill)
})

export { paginationDto, idParamDto, createDto, updateDto }
