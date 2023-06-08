const express = require("express");
const { validateBody } = require("../../decorators");
const schemas = require("../../schemas/authSchemas");
const authController = require("../../controllers/authController");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), authController.register);
router.post("/login", validateBody(schemas.loginSchema), authController.login);

module.exports = router;