import InvoiceController from "../controllers/InvoiceController";
import JwtService from "../middleware/JwtService";
import express from "express";

const router = express.Router();
const invoiceRoute = (app) => {
    router.post('/create-invoice', InvoiceController.createInvoice);
    router.put('/accept-invoice/:id', InvoiceController.acceptInvoice);
    router.get('/get-all-invoices', InvoiceController.getAllInvoices);
    router.get('/get-invoice/:id', InvoiceController.getInvoice);
    router.put('/update-invoice/:id', InvoiceController.updateInvoice);
    router.put('/reject-invoice/:id', InvoiceController.rejectInvoice);
    return app.use('/invoices', router);
}

module.exports = invoiceRoute;