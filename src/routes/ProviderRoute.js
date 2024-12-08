import ProviderController from "../controllers/ProviderController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const providerRoute = (app) => {
    router.post('/create-provider', JwtService.checkUserJwt, JwtService.checkUserPermission, ProviderController.createProvider);
    router.put('/update-provider/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, ProviderController.updateProvider);
    router.get('/get-all-providers', JwtService.checkUserJwt, JwtService.checkUserPermission, ProviderController.getAllProviders);
    router.get('/get-all-active-providers', JwtService.checkUserJwt, JwtService.checkUserPermission, ProviderController.getAllActiveProviders);
    router.get('/get-provider/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, ProviderController.getProvider);
    router.delete('/delete-provider/:id', JwtService.checkUserJwt, JwtService.checkUserPermission, ProviderController.deActiveProvider);
    return app.use('/providers', router);
}

module.exports = providerRoute;