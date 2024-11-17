import ReportController from "../controllers/ReportController";
import express from "express";

const router = express.Router();
const reportRoute = (app) => {
    router.get('/income', ReportController.getIncomeReport);
    return app.use('/report', router);
}

module.exports = reportRoute;