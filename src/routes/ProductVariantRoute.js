import ProductVariantController from "../controllers/ProductVariantController";
import express from "express";

const router = express.Router();
const ProductVariantRoute = (app) => {
    router.post('/create-variant/:productId', ProductVariantController.createProductVariant);
    router.put('/update-variant/:id', ProductVariantController.updateProductVariant);
    router.delete('/delete-variant/:id', ProductVariantController.deleteProductVariant);
    router.get('/get-all-variants/:productId', ProductVariantController.getAllProductVariants);
    router.get('/get-variant/:id', ProductVariantController.getAllProductVariantsByProductId);
    router.get('/', ProductVariantController.getAllProductVariants)
    return app.use('/variants', router);
}

module.exports = ProductVariantRoute;