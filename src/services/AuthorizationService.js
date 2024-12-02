import { raw } from 'body-parser';
import db from '../models/index.js';

class AuthorizationService {
    getAllPermissions = async() => {
        try {
            const permissions = await db.Permission.findAll(
                {
                    attributes: ['id', 'name']
                },
            );
            return {
                EM: "Get all permissions successfully",
                EC: 0,
                DT: permissions
            }
        }
        catch(error) {
            return {
                EM: error.message,
                EC: 1,
                DT: null
            }
        }
    }

    getRolePermissions = async(roleId) => {
        try {
            const rolePermissions = await db.Permission.findAll(
                {
                    include: [
                        {
                            model: db.RolePermission,
                            attributes: [],
                            raw: true,
                            required: true,
                            where: {
                                roleId: roleId
                            }
                        },
                    ],
                    raw: false,
                    nest: true,
                    attributes: ['id', 'name']
                }
            );
            return {
                EM: "Get role permissions successfully",
                EC: 0,
                DT: rolePermissions
            }
        } catch(error) {
            return {
                EM: error.message,
                EC: 1,
                DT: null
            }
        }
    }

    updateRolePermissions = async(roleId, permissions) => {
        try {
            db.RolePermission.destroy({
                where: {
                    roleId: roleId
                }
            });

            permissions.forEach(async(permissionId) => {
                await db.RolePermission.create({
                    roleId: roleId,
                    permissionId: permissionId
                });
            });
            return {
                EM: "Update role permissions successfully",
                EC: 0,
                DT: ""
            }
        } catch(error) {
            return {
                EM: error.message,
                EC: 1,
                DT: null
            }
        }
    }
}

module.exports = new AuthorizationService();