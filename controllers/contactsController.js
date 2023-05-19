const Joi = require('joi');
const contactsServise = require("../models/contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const listContacts = async (_, res) => {
    const result = await contactsServise.listContacts();
    res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsServise.getContactById(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    };
    res.json(result);
};

const addContact = async (req, res) => {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
        throw HttpError(400, `missing required ${error.details[0].context.key} field`);
    }
    const result = await contactsServise.addContact(req.body);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsServise.removeContact(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    };
    res.send({
        message: "contact deleted"
    });
};

const updateContactById = async (req, res) => {
    if (!Object.keys(req.body).length) {
        throw HttpError(400, "missing fields");
    }
    
    const { error } = addContactSchema.validate(req.body);
    if (error) {
        throw HttpError(400, `missing required ${error.details[0].context.key} field`);
    }

    const { contactId } = req.params;
    const result = await contactsServise.updateContactById(contactId, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    };
    res.json(result);
};

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContactById: ctrlWrapper(updateContactById),
};
