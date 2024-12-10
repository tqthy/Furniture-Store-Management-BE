import ProductController from "../controllers/ProductController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const productRoute = (app) => {
    router.post('/create-product', ProductController.createProduct);
    router.put('/update-product/:id', ProductController.updateProduct);
    router.delete('/delete-product/:id', ProductController.deleteProduct);
    router.get('/get-all-products', ProductController.getAllProducts);
    router.get('/get-product/:id', ProductController.getProductById);
    router.put('/stop-selling/:id', ProductController.stopSellProduct);
    return app.use('/products', router);
}

module.exports = productRoute;