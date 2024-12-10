import ProviderController from "../controllers/ProviderController";
import express from "express";
import JwtService from "../middleware/JwtService";

const router = express.Router();
const providerRoute = (app) => {
    router.post('/create-provider', ProviderController.createProvider);
    router.put('/update-provider/:id', ProviderController.updateProvider);
    router.get('/get-all-providers', ProviderController.getAllProviders);
    router.get('/get-all-active-providers', ProviderController.getAllActiveProviders);
    router.get('/get-provider/:id', ProviderController.getProvider);
    router.delete('/delete-provider/:id', ProviderController.deActiveProvider);
    return app.use('/providers', router);
}

module.exports = providerRoute;