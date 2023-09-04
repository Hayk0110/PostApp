const Joi = require("joi");
const validator = require("../validator")

const signinSchema = Joi.object({
    email: Joi.string().empty().email().required(),
    password: Joi.string().empty().min(6).max(24).required(),
})

const signupSchema = Joi.object({
    email: Joi.string().empty().email().required(),
    password: Joi.string().empty().min(6).max(24).required(),
    // passwordAgain: Joi.string().empty().required().valid(Joi.ref('password')),
})

exports.validateSignin = validator(signinSchema)
exports.validateSignup = validator(signupSchema)