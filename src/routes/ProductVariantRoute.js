import ProductVariantController from "../controllers/ProductVariantController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const ProductVariantRoute = (app) => {
    router.post('/create-variant/:productId', ProductVariantController.createProductVariant);
    router.put('/update-variant/:id', ProductVariantController.updateProductVariant);
    router.delete('/delete-variant/:id', ProductVariantController.deleteProductVariant);
    router.get('/get-all-variants/:productId', ProductVariantController.getAllProductVariantsByProductId);
    router.get('/get-variant/:id', ProductVariantController.getProductVariantById);
    router.get('/', ProductVariantController.getAllProductVariants)
    return app.use('/variants', router);
}

module.exports = ProductVariantRoute;