import { status } from "../database/schema.js"
import Joi from "joi"

const idParamDto = Joi.object({
	id: Joi.number().min(0).required()
})

const createDto = Joi.object({
	fullName: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
	status: Joi.string()
		.valid(...status)
		.required(),
	expectedSalary: Joi.number().min(0).required(),
	skills: Joi.object().pattern(Joi.string(), Joi.number().min(0))
})

const updateDto = Joi.object({
	fullName: Joi.string(),
	email: Joi.string().email(),
	phone: Joi.string(),
	status: Joi.string().valid(...status),
	expectedSalary: Joi.number().min(0),
	skills: Joi.object().pattern(Joi.string(), Joi.number().min(0))
})

export { idParamDto, createDto, updateDto }
