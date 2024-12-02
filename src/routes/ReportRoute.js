import ReportController from "../controllers/ReportController";
import express from "express";

const router = express.Router();
const reportRoute = (app) => {
    // router.get('/download', CustomerController.createCustomer);
    router.get('/general', ReportController.getGeneralReport);
    return app.use('/report', router);
}

module.exports = reportRoute;