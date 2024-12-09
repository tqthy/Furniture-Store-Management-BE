import InvoiceController from "../controllers/InvoiceController";
import JwtService from "../middleware/JwtService";
import express from "express";

const router = express.Router();
const invoiceRoute = (app) => {
    router.post('/create-invoice', InvoiceController.createInvoice);
    router.put('/accept-invoice/:id', InvoiceController.acceptInvoice);
    router.get('/get-all-invoices', JwtService.checkUserJwt, JwtService.checkUserPermission, InvoiceController.getAllInvoices);
    router.get('/get-invoice/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, InvoiceController.getInvoice);
    router.put('/update-invoice/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, InvoiceController.updateInvoice);
    router.put('/reject-invoice/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, InvoiceController.rejectInvoice);
    return app.use('/invoices', router);
}

module.exports = invoiceRoute;