import StaffController from "../controllers/StaffController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const staffRoute = (app) => {
    router.post('/create-staff', StaffController.createStaff);
    router.put('/update-staff/:id', StaffController.updateStaff);
    router.get('/get-staff/:id', StaffController.getStaff);
    router.get('/get-all-staffs', StaffController.getAllStaffs);
    router.delete('/delete-staff/:id', StaffController.deleteStaff);
    return app.use('/staffs', router);
}
module.exports = staffRoute;