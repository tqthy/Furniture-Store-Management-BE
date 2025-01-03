import AuthController from "../controllers/AuthController";
import express from "express";

const router = express.Router();
const authRoute = (app) => {
    router.post('/login', AuthController.login);
    router.post('/forgot-password', AuthController.forgotPassword);
    router.post('/verify-forgot-password-token', AuthController.verifyForgotPasswordToken);
    router.post('/reset-password', AuthController.resetPassword);
    return app.use('/', router);
}

module.exports = authRoute;