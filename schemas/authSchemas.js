const Joi = require('joi');

const subscriptionList = ["starter", "pro", "business"];

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid(...subscriptionList),
    token: Joi.string(),
});

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});


module.exports = {
    registerSchema,
    loginSchema,
}