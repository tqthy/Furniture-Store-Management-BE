import MaintainanceController from "../controllers/MaintainanceController";
import express from "express";

const router = express.Router();
const maintainanceRoute = (app) => {
    router.get('/warranty', MaintainanceController.getAllWarranties);
    router.get('/warranty/order/:warrantyId', MaintainanceController.getWarrantyOrderByWarrantyId);
    router.get('/warranty/order/status/:status', MaintainanceController.getWarrantyOrderByStatus);
    router.get('/warranty/order/', MaintainanceController.getAllWarrantyOrders);
    router.post('/warranty/order/', MaintainanceController.createWarrantyOrder);
    router.patch('/warranty/order/:id', MaintainanceController.updateWarrantyOrder);
    router.delete('/warranty/order/:id', MaintainanceController.deleteWarrantyOrder);

    router.get('/repair/status/:status', MaintainanceController.getRepairOrderByStatus);
    router.get('/repair/order/', MaintainanceController.getAllRepairOrders);
    router.post('/repair/order/', MaintainanceController.createRepairOrder);
    router.patch('/repair/order/:id', MaintainanceController.updateRepairOrder);
    router.delete('/repair/order/:id', MaintainanceController.deleteRepairOrder);
    return app.use('/maintainance', router);
}

module.exports = maintainanceRoute;