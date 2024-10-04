import GoodsReceiptService from "../services/GoodsReceiptService";
class GoodsReceiptController {
    createGoodsReceipt = async(req, res) => {
        const { shipping, GoodsReceiptDetailsData } = req.body;
        if (!shipping || !GoodsReceiptDetailsData) {
            return res.status(200).json({
                EM: 'Missing shipping or goods receipt details data',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await GoodsReceiptService.createGoodsReceipt(shipping, GoodsReceiptDetailsData);
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
}
module.exports = new GoodsReceiptController();