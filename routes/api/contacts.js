const express = require('express');
const contactsController = require("../../controllers/contactsController");
const { validateBody, verificateBody, verificateBodyFavorite } = require("../../decorators");
const schemas = require("../../schemas/contactsSchemas");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get('/', authenticate, contactsController.listContacts);

router.get('/:contactId', authenticate, isValidId, contactsController.getContactById);

router.post('/', authenticate, validateBody(schemas.addContactSchema), contactsController.addContact);

router.delete('/:contactId', authenticate, isValidId, contactsController.removeContact);

router.put('/:contactId', authenticate, isValidId, verificateBody(), validateBody(schemas.addContactSchema), contactsController.updateContactById);

router.patch('/:contactId/favorite', authenticate, isValidId, verificateBodyFavorite(), validateBody(schemas.updateFavoriteSchema), contactsController.updateStatusContact);

module.exports = router;
