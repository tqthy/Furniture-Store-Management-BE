import AuthorizationService from '../services/AuthorizationService';

class AuthorizationController {
    getAllPermissions = async (req, res) => {
        try {
            const result = await AuthorizationService.getAllPermissions();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    getRolePermissions = async (req, res) => {
        const { roleId } = req.params;
        try {
            const result = await AuthorizationService.getRolePermissions(roleId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    updateRolePermissions = async (req, res) => {
        const { roleId } = req.params
        const { permissions } = req.body;
        if (!permissions) {
            return res.status(200).json({
                EM: "Permissions is required",
                EC: 1,
                DT: null
            })
        }
        try {
            const result = await AuthorizationService.updateRolePermissions(roleId, permissions);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
module.exports = new AuthorizationController();