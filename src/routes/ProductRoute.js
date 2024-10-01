import ProductController from "../controllers/ProductController";
import express from "express";

const router = express.Router();
const productRoute = (app) => {
    router.post('/create-product', ProductController.createProduct);
    return app.use('/products', router);
}

module.exports = productRoute;