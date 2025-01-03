import InvoiceService from "../services/InvoiceService";
import MaintainanceService from "../services/MaintainanceService";

class InvoiceController {
    createInvoice = async(req, res) => {
        const staffId = req.user.staffId;
        const { InvoiceDetailsData, totalCost, customerId } = req.body;
        if (!InvoiceDetailsData || !totalCost) {
            return res.status(200).json({
                EM: 'Mising invoice details data',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await InvoiceService.createInvoice(totalCost, InvoiceDetailsData, staffId, customerId);
            res.status(200).json(response);

        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    acceptInvoice = async (req, res) => {
        const id = req.params.id;
        const { paymentMethod } = req.body;
    
        try {
            const response = await InvoiceService.acceptInvoice(id, paymentMethod);
            if (response.EC === 1) {
                throw new Error(response.EM);
            }
    
            const invoiceDetails = response.DT.InvoiceDetails.map(detail => detail.toJSON());
            const warranties = [];
            const currentDate = new Date();
            const customerId = response.DT.customerId;
    
            for (const invoiceDetail of invoiceDetails) {
                const warrantyMonth = invoiceDetail.ProductVariant.Product.warranty;
    
                const warrantyStartDate = new Date(currentDate);
                const warrantyEndDate = new Date(warrantyStartDate);
                warrantyEndDate.setMonth(warrantyEndDate.getMonth() + warrantyMonth);
    
                warranties.push({
                    customerId: customerId,
                    invoiceDetailsId: invoiceDetail.id,
                    startDate: warrantyStartDate,
                    endDate: warrantyEndDate,
                });
            }
    

            const newWarranties = await MaintainanceService.createWarranties(warranties);
            if (newWarranties.EC === 0) {
                response.DT.warranties = newWarranties.DT;
            }
            const cleanResponse = {
                EM: response.EM,
                EC: response.EC,
                DT: {
                    ...response.DT.toJSON(), // Convert top-level instance to JSON
                    InvoiceDetails: response.DT.InvoiceDetails.map(detail => ({
                        ProductVariant: {
                            ...detail.ProductVariant.toJSON(), // Convert nested ProductVariant to JSON
                            Product: detail.ProductVariant.Product.toJSON(), // Convert nested Product to JSON
                        },
                    })),
                    warranties: newWarranties.DT,
                },
            };

            return res.status(200).json(cleanResponse);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };

    getAllInvoices = async(req, res) => {
        try {
            const response = await InvoiceService.getAllInvoices();
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getInvoice = async(req, res) => {
        const id = req.params.id;
        try {
            const response = await InvoiceService.getInvoice(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    updateInvoice = async(req, res) => {
        const id = req.params.id;
        const staffId = req.user.staffId;
        const {InvoiceDetailsData, totalCost, paymentMethod, customerId } = req.body;
        if (!InvoiceDetailsData || !totalCost) {
            return res.status(200).json({
                EM: 'Missing invoice details data',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await InvoiceService.updateInvoice(id, InvoiceDetailsData, totalCost, staffId, customerId, paymentMethod);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    rejectInvoice = async(req, res) => {
        const id = req.params.id;
        try {
            const response = await InvoiceService.rejectInvoice(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new InvoiceController();