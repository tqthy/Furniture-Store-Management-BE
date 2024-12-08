import GoodsReceiptController from "../controllers/GoodsReceiptController";

import express from "express";
import JwtService from "../middleware/JwtService";
const router = express.Router();
const goodsReceiptRoute = (app) => {
    router.post('/create-goods-receipt', JwtService.checkUserJwt, JwtService.checkUserPermission, GoodsReceiptController.createGoodsReceipt);
    router.put('/accept-goods-receipt/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, GoodsReceiptController.acceptGoodsReceipt);
    router.get('/get-all-goods-receipts', JwtService.checkUserJwt, JwtService.checkUserPermission, GoodsReceiptController.getAllGoodsReceipts);
    router.get('/get-goods-receipt/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, GoodsReceiptController.getGoodsReceipt);
    router.put('/update-goods-receipt/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, GoodsReceiptController.updateGoodsReceipt);
    router.put('/reject-goods-receipt/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, GoodsReceiptController.rejectGoodsReceipt);
    return app.use('/goods-receipt', router);
}

module.exports = goodsReceiptRoute;