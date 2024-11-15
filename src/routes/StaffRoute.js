import StaffController from "../controllers/StaffController";
import express from "express";

const router = express.Router();
const staffRoute = (app) => {
    router.post('/create-staff', StaffController.createStaff);
    return app.use('/staffs', router);
}
module.exports = staffRoute;