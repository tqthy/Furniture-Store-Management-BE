import GoodsReceiptController from "../controllers/GoodsReceiptController";

import express from "express";

const router = express.Router();
const goodsReceiptRoute = (app) => {
    router.post('/create-goods-receipt', GoodsReceiptController.createGoodsReceipt);
    router.put('/accept-goods-receipt/:id', GoodsReceiptController.acceptGoodsReceipt);
    return app.use('/goods-receipt', router);
}

module.exports = goodsReceiptRoute;