const Joi = require("joi");
const validator = require("../validator")

const addPostSchema = Joi.object({
    userId: Joi.string().empty().required(),
    title: Joi.string().empty().required().max(50),
    text: Joi.string().empty().required().max(240),
    category: Joi.string().empty().required(),
})

const updatedPostSchema = Joi.object({
    title: Joi.string().empty().max(50),
    text: Joi.string().empty().max(240),
    category: Joi.string().empty(),
    published: Joi.boolean().empty()
})

exports.validateAddPost = validator(addPostSchema)
exports.validateUpdatePost = validator(updatedPostSchema)