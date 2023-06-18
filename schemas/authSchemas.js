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

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList).required(),
});

const emailSchema = Joi.object({
    email: Joi.string().required(),
});

module.exports = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    emailSchema
};
