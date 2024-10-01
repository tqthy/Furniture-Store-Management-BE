import CatalogueController from "../controllers/CatalogueController";
import express from "express";

const router = express.Router();
const catalogueRoute = (app) => {
    router.post('/create-catalogue', CatalogueController.createCatalogue);
    return app.use('/catalogue', router);
}

module.exports = catalogueRoute;