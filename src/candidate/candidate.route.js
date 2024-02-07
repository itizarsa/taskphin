import { findAll, find, create, update, remove } from "./candidate.service.js"
import { idParamDto, createDto, updateDto } from "./candidate.dto.js"
import { validate } from "../validator/validator.middleware.js"
import { wrapper } from "../common/controller.js"
import express from "express"

const router = express.Router()

router.get("/", wrapper(findAll))

router.get("/:id", validate(idParamDto, "params"), wrapper(find))

router.post("/", validate(createDto, "body"), wrapper(create))

router.put("/:id", validate(idParamDto, "params"), validate(updateDto, "body"), wrapper(update))

router.delete("/:id", validate(idParamDto, "params"), wrapper(remove))

export default router
