import PromotionController from "../controllers/PromotionController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const promotionRoute = (app) => {
    router.get('/get-all-promotions', PromotionController.getAllPromotions);
    router.get('/get-promotion/:id', PromotionController.getPromotionById);
    router.get('', PromotionController.getCurrentPromotion);
    router.post('/create-promotion', PromotionController.createPromotion);
    router.put('/update-promotion', PromotionController.updatePromotion);
    router.patch('/stop-promotion', PromotionController.stopPromotion);
    router.delete('/delete-promotion/:id', PromotionController.deletePromotion);
    return app.use('/promotion', router);
}

module.exports = promotionRoute;