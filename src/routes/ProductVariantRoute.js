import ProductVariantController from "../controllers/ProductVariantController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const ProductVariantRoute = (app) => {
    router.post('/create-variant/:productId', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductVariantController.createProductVariant);
    router.put('/update-variant/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductVariantController.updateProductVariant);
    router.delete('/delete-variant/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductVariantController.deleteProductVariant);
    router.get('/get-all-variants/:productId', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductVariantController.getAllProductVariantsByProductId);
    router.get('/get-variant/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductVariantController.getProductVariantById);
    router.get('/', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductVariantController.getAllProductVariants)
    return app.use('/variants', router);
}

module.exports = ProductVariantRoute;