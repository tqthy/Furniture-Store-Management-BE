import CatalogueController from "../controllers/CatalogueController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const catalogueRoute = (app) => {
    router.post('/create-catalogue', CatalogueController.createCatalogue);
    router.put('/update-catalogue/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, CatalogueController.updateCatalogue);
    router.get('/get-all-catalogues', JwtService.checkUserJwt, JwtService.checkUserPermission, CatalogueController.getAllCatalogues);
    router.delete('/delete-catalogue/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, CatalogueController.deleteCatalogue);
    return app.use('/catalogues', router);
}

module.exports = catalogueRoute;