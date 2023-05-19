const contactsServise = require("../models/contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

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
