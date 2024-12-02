import AuthorizationController from "../controllers/AuthorizationController";

import express from "express";

const router = express.Router();
const authorizationRoute = (app) => {
    router.get('/get-all-permissions', AuthorizationController.getAllPermissions);
    router.get('/permissions-by-role/:roleId', AuthorizationController.getRolePermissions);
    router.put('/update-permissons/:roleId', AuthorizationController.updateRolePermissions);
    return app.use('/authorization', router);
}

module.exports = authorizationRoute;