import db from '../db';

class AuthorizeService {
    getRolePermissions(roleId) {
        const rolePermissions = db.RolePermission.findAll(
            {
                where: {
                    roleId: roleId
                },
                include: [
                    {
                        model: db.Permission,
                        attributes: ['id', 'name']
                    }
                ],
                attributes: ['roleId']
            }
        );
    }
}

module.exports = new AuthorizeService();