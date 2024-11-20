import FileController from "../controllers/FileController";
import express from "express";

const router = express.Router();
const fileRoute = (app) => {
    router.get('/presigned-url', FileController.getPresignedUrl);
    // router.get('/download', CustomerController.createCustomer);
    return app.use('/file', router);
}

module.exports = fileRoute;