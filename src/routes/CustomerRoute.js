import CustomerController from "../controllers/CustomerController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const customerRoute = (app) => {
    router.post('/create-customer', CustomerController.createCustomer);
    router.put('/update-customer/:id', CustomerController.updateCustomer);
    router.get('/get-customer/:id', CustomerController.getCustomer);
    router.get('/get-all-customers', CustomerController.getAllCustomers);
    router.delete('/delete-customer/:id', CustomerController.deleteCustomer);
    return app.use('/customers', router);
}

module.exports = customerRoute;