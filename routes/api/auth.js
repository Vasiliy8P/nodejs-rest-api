const express = require("express");
const { validateBody } = require("../../decorators");
const schemas = require("../../schemas/authSchemas");
const authController = require("../../controllers/authController");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), authController.register);

router.get("/verify/:verificationToken", authController.verifyEmail);

router.post("/login", validateBody(schemas.loginSchema), authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch("/subscription", authenticate, validateBody(schemas.subscriptionSchema), authController.changeSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar)

module.exports = router;