import ProductVariantController from "../controllers/ProductVariantController";
import express from "express";

const router = express.Router();
const ProductVariantRoute = (app) => {
    router.post('/create-variant', ProductVariantController.createProductVariant);
    router.put('/update-variant/:id', ProductVariantController.updateProductVariant);
    router.delete('/delete-variant/:id', ProductVariantController.deleteProductVariant);
    router.get('/get-all-variants', ProductVariantController.getAllProductVariants);
    router.get('/get-variant/:id', ProductVariantController.getProductVariantById);
    return app.use('/variants', router);
}

module.exports = ProductVariantRoute;