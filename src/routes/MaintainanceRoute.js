import MaintainanceController from "../controllers/MaintainanceController";
import express from "express";
import JwtService from "../middleware/JwtService";
const router = express.Router();
const maintainanceRoute = (app) => {
    router.get('/warranty', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.getAllWarranties);
    router.get('/warranty/order/:warrantyId', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.getWarrantyOrderByWarrantyId);
    router.get('/warranty/order/status/:status', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.getWarrantyOrderByStatus);
    router.get('/warranty/order/', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.getAllWarrantyOrders);
    router.post('/warranty/order/', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.createWarrantyOrder);
    router.patch('/warranty/order/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.updateWarrantyOrder);
    router.delete('/warranty/order/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.deleteWarrantyOrder);

    router.get('/repair/status/:status', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.getRepairOrderByStatus);
    router.get('/repair/order/', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.getAllRepairOrders);
    router.post('/repair/order/', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.createRepairOrder);
    router.patch('/repair/order/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.updateRepairOrder);
    router.delete('/repair/order/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, MaintainanceController.deleteRepairOrder);
    return app.use('/maintainance', router);
}

module.exports = maintainanceRoute;