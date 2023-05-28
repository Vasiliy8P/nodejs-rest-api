const express = require('express');
const contactsController = require("../../controllers/contactsController");
const { validateBody, verificateBody, verificateBodyFavorite } = require("../../decorators");
const schemas = require("../../schemas/contactsSchemas");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get('/', contactsController.listContacts);

router.get('/:contactId', isValidId, contactsController.getContactById);

router.post('/', validateBody(schemas.addContactSchema), contactsController.addContact);

router.delete('/:contactId', isValidId, contactsController.removeContact);

router.put('/:contactId', isValidId, verificateBody(), validateBody(schemas.addContactSchema), contactsController.updateContactById);

router.patch('/:contactId/favorite', isValidId, verificateBodyFavorite(), validateBody(schemas.updateFavoriteSchema), contactsController.updateStatusContact);

module.exports = router;
