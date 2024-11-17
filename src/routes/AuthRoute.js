import AuthController from "../controllers/AuthController";
import express from "express";

const router = express.Router();
const authRoute = (app) => {
    router.post('/login', AuthController.login);
    return app.use('/', router);
}

module.exports = authRoute;