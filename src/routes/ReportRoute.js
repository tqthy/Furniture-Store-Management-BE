import ReportController from "../controllers/ReportController";
import express from "express";

const router = express.Router();
const reportRoute = (app) => {
    // router.get('/download', CustomerController.createCustomer);
    router.get('/general', ReportController.getGeneralReport);
    router.get('/income', ReportController.getIncomeReport);
    router.get('/staff', ReportController.getSaleStaffReport);
    return app.use('/report', router);
}

module.exports = reportRoute;