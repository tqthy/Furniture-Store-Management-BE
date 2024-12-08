import ReportController from "../controllers/ReportController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const reportRoute = (app) => {
    // router.get('/download', CustomerController.createCustomer);
    router.get('/general', JwtService.checkUserJwt, JwtService.checkUserPermission, ReportController.getGeneralReport);
    router.get('/income', JwtService.checkUserJwt, JwtService.checkUserPermission, ReportController.getIncomeReport);
    return app.use('/report', router);
}

module.exports = reportRoute;