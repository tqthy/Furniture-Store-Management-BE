import GoodsReceiptController from "../controllers/GoodsReceiptController";

import express from "express";
import JwtService from "../middleware/JwtService";
const router = express.Router();
const goodsReceiptRoute = (app) => {
    router.post('/create-goods-receipt', GoodsReceiptController.createGoodsReceipt);
    router.put('/accept-goods-receipt/:id', GoodsReceiptController.acceptGoodsReceipt);
    router.get('/get-all-goods-receipts', GoodsReceiptController.getAllGoodsReceipts);
    router.get('/get-goods-receipt/:id', GoodsReceiptController.getGoodsReceipt);
    router.put('/update-goods-receipt/:id', GoodsReceiptController.updateGoodsReceipt);
    router.put('/reject-goods-receipt/:id', GoodsReceiptController.rejectGoodsReceipt);
    return app.use('/goods-receipt', router);
}

module.exports = goodsReceiptRoute;