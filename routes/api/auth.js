const express = require("express");
const { validateBody } = require("../../decorators");
const schemas = require("../../schemas/authSchemas");
const authController = require("../../controllers/authController");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), authController.register);

router.post("/login", validateBody(schemas.loginSchema), authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch("/users/subscription", authenticate, validateBody(schemas.subscriptionSchema), authController.changeSubscription);

module.exports = router;