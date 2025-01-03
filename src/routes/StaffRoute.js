import StaffController from "../controllers/StaffController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const staffRoute = (app) => {
    router.post('/create-staff', JwtService.checkUserJwt, JwtService.checkUserPermission, StaffController.createStaff);
    router.put('/update-staff/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, StaffController.updateStaff);
    router.get('/get-staff/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, StaffController.getStaff);
    router.get('/get-all-staffs', JwtService.checkUserJwt, JwtService.checkUserPermission, StaffController.getAllStaffs);
    router.delete('/delete-staff/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, StaffController.deleteStaff);
    return app.use('/staffs', router);
}
module.exports = staffRoute;