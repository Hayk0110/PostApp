const Joi = require("joi");
const validator = require("../validator")

const addCommentSchema = Joi.object({
    userId: Joi.string().required().empty(),
    postId: Joi.string().required().empty(),
    text: Joi.string().required().empty().max(240),
    rate: Joi.number().required().empty().min(1).max(5)
}) 

const updateCommentSchema = Joi.object({
    text: Joi.string().empty().max(240),
    rate: Joi.number().empty().min(1).max(5)
}) 

const deleteCommentSchema = Joi.object({
    userId: Joi.string().required().empty(),
    commentId: Joi.string().required().empty(),
}) 

exports.validateAddComment = validator(addCommentSchema);
exports.validateUpdateComment = validator(updateCommentSchema);
exports.validateDeleteComment = validator(deleteCommentSchema);