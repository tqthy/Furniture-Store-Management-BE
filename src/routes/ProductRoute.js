import ProductController from "../controllers/ProductController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const productRoute = (app) => {
    router.post('/create-product', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductController.createProduct);
    router.put('/update-product/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductController.updateProduct);
    router.delete('/delete-product/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductController.deleteProduct);
    router.get('/get-all-products', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductController.getAllProducts);
    router.get('/get-product/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductController.getProductById);
    router.put('/stop-selling/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, ProductController.stopSellProduct);
    return app.use('/products', router);
}

module.exports = productRoute;