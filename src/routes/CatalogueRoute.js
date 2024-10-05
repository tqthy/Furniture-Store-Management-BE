import CatalogueController from "../controllers/CatalogueController";
import express from "express";

const router = express.Router();
const catalogueRoute = (app) => {
    router.post('/create-catalogue', CatalogueController.createCatalogue);
    router.put('/update-catalogue/:id', CatalogueController.updateCatalogue);
    router.get('/get-all-catalogues', CatalogueController.getAllCatalogues);
    router.delete('/delete-catalogue/:id', CatalogueController.deleteCatalogue);
    return app.use('/catalogues', router);
}

module.exports = catalogueRoute;