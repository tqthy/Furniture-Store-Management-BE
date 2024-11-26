import GoodsReceiptService from "../services/GoodsReceiptService";
class GoodsReceiptController {
    createGoodsReceipt = async(req, res) => {
        const { shipping, GoodsReceiptDetailsData, totalCost, providerId } = req.body;
        if (!shipping || !GoodsReceiptDetailsData || !totalCost || !providerId) {
            return res.status(200).json({
                EM: 'Missing shipping or goods receipt details data',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await GoodsReceiptService.createGoodsReceipt(shipping, GoodsReceiptDetailsData, totalCost, providerId);
            await GoodsReceiptService.acceptGoodsReceipt(response.DT.id);
            res.status(200).json(response);

        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    acceptGoodsReceipt = async(req, res) => {
        const id  = req.params.id;
        try {
            const response = await GoodsReceiptService.acceptGoodsReceipt(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getAllGoodsReceipts = async(req, res) => {
        try {
            const response = await GoodsReceiptService.getAllGoodsReceipts();
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getGoodsReceipt = async(req, res) => {
        const id = req.params.id;
        try {
            const response = await GoodsReceiptService.getGoodsReceipt(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    updateGoodsReceipt = async(req, res) => {
        const id = req.params.id;
        const { shipping, GoodsReceiptDetailsData, totalCost } = req.body;
        if (!shipping || !GoodsReceiptDetailsData || !totalCost) {
            return res.status(200).json({
                EM: 'Missing shipping or goods receipt details data',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await GoodsReceiptService.updateGoodsReceipt(id, shipping, GoodsReceiptDetailsData, totalCost);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    rejectGoodsReceipt = async(req, res) => {
        const id = req.params.id;
        try {
            const response = await GoodsReceiptService.rejectGoodsReceipt(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new GoodsReceiptController();