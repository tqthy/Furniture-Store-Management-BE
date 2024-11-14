import InvoiceService from "../services/InvoiceService";

class InvoiceController {
    createInvoice = async(req, res) => {
        const { InvoiceDetailsData, totalCost } = req.body;
        if (!InvoiceDetailsData || !totalCost) {
            return res.status(200).json({
                EM: 'Mising invoice details data',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await InvoiceService.createInvoice(totalCost, InvoiceDetailsData, null, null);
            res.status(200).json(response);

        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    acceptInvoice = async(req, res) => {
        const id  = req.params.id;
        try {
            const response = await InvoiceService.acceptInvoice(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

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
        const {InvoiceDetailsData, totalCost } = req.body;
        if (!InvoiceDetailsData || !totalCost) {
            return res.status(200).json({
                EM: 'Missing invoice details data',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await InvoiceService.updateInvoice(id, InvoiceDetailsData, totalCost, null, null);
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