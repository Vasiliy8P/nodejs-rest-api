const express = require('express')
const Joi = require('joi');
const contactsServise = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router()

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsServise.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServise.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsServise.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  } 
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServise.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsServise.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
