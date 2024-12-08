import CustomerController from "../controllers/CustomerController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const customerRoute = (app) => {
    router.post('/create-customer', JwtService.checkUserJwt, JwtService.checkUserPermission, CustomerController.createCustomer);
    router.put('/update-customer/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, CustomerController.updateCustomer);
    router.get('/get-customer/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, CustomerController.getCustomer);
    router.get('/get-all-customers', JwtService.checkUserJwt, JwtService.checkUserPermission, CustomerController.getAllCustomers);
    router.delete('/delete-customer/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, CustomerController.deleteCustomer);
    return app.use('/customers', router);
}

module.exports = customerRoute;