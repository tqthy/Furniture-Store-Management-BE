import PromotionController from "../controllers/PromotionController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const promotionRoute = (app) => {
    router.get('/get-all-promotions', JwtService.checkUserJwt, JwtService.checkUserPermission, PromotionController.getAllPromotions);
    router.get('/get-promotion/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, PromotionController.getPromotionById);
    router.get('', JwtService.checkUserJwt, JwtService.checkUserPermission, PromotionController.getCurrentPromotion);
    router.post('/create-promotion', JwtService.checkUserJwt, JwtService.checkUserPermission, PromotionController.createPromotion);
    router.put('/update-promotion', JwtService.checkUserJwt, JwtService.checkUserPermission, PromotionController.updatePromotion);
    router.patch('/stop-promotion', JwtService.checkUserJwt, JwtService.checkUserPermission, PromotionController.stopPromotion);
    router.delete('/delete-promotion/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, PromotionController.deletePromotion);
    return app.use('/promotion', router);
}

module.exports = promotionRoute;