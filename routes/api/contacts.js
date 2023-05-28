const express = require('express');
const contactsController = require("../../controllers/contactsController");
const { validateBody } = require("../../decorators");
// const { verificateBody } = require("../../decorators");
const schemas = require("../../schemas/contactsSchemas");

const router = express.Router();

router.get('/', contactsController.listContacts);

// router.get('/:contactId', contactsController.getContactById);

router.post('/', validateBody(schemas.addContactSchema), contactsController.addContact);

// router.delete('/:contactId', contactsController.removeContact);

// router.put('/:contactId', verificateBody(), validateBody(schemas.addContactSchema), contactsController.updateContactById);

module.exports = router;
