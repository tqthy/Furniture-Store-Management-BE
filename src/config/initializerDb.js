import db from '../models/index.js';
import SecurityService from "../utils/SecurityService.js";
class seedData {
    seedAccount = async() => {
        const checkAdmin = await db.Account.findOne({ where: { username: 'Admin' } });
        if (checkAdmin) {
            return;
        }
        const hashPassword = SecurityService.hashUserPassword('Admin');
        await db.Account.create({
            username: 'Admin',
            password: hashPassword,
            roleId: 1,
            status: "active"
        });

        const checkManager = await db.Account.findOne({ where: { username: 'Manager' } });
        if (checkManager) {
            return;
        }
        const hashPasswordManager = SecurityService.hashUserPassword('Manager');
        await db.Account.create({
            username: 'Manager',
            password: hashPasswordManager,
            roleId: 2,
            status: "active"
        });
    }
}

module.exports = new seedData();