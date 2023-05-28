const Joi = require('joi');

const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    addres: Joi.string(),
    favorite: Joi.boolean(),
});

module.exports = {
    addContactSchema,
};