import { where } from 'sequelize';
import db from '../models';
import DbValueService from '../utils/DbValueService';
import SecurityHandler from '../utils/SecurityService';
import { raw } from 'body-parser';

class StaffService {
    createStaff = async (fullname, birth, gender, idNumber, startDate, phone, email, role) => {
        const t = await db.sequelize.transaction();
        try {
            let username;
            let idNum;
            const check = await db.Staff.findOne(
                {
                    where: {
                        email: email,
                    }
                }
            );
            if (check) {
                return {
                    EM: 'Email already exists',
                    EC: 1,
                    DT: ''
                }
            }

            if (role == 3) 
            {
                idNum = await DbValueService.getValue('SaleStaff');
                await DbValueService.updateValue('SaleStaff', idNum + 1);
                username = "SaleStaff" + idNum.toString().padStart(4, '0');
            } else if (role == 4) 
            {
                idNum = await DbValueService.getValue('InventoryStaff');
                await DbValueService.updateValue('InventoryStaff', idNum + 1);
                username = "InventoryStaff" + idNum.toString().padStart(4, '0');
            } else if (role == 5)
            {
                idNum = await DbValueService.getValue('RepairStaff');
                await DbValueService.updateValue('RepairStaff', idNum + 1);
                username = "RepairStaff" + idNum.toString().padStart(4, '0');
            }
            

            if (idNum == null) {
                return {
                    EM: 'Error',
                    EC: 1,
                    DT: ''
                }
            }

            const password = SecurityHandler.hashUserPassword(username);

            const account = await db.Account.create({
                username: username,
                password: password,
                roleId: role,
                status: 'active'
            }, { transaction: t })

            const newStaff = await db.Staff.create({
                fullname: fullname,
                birth: birth,
                gender: gender,
                idNumber: idNumber,
                startDate: startDate,
                phone: phone,
                email: email,
                accountId: account.id,
            }, { transaction: t });

            await t.commit();
            return {
                EM: 'create staff successfully',
                EC: 0,
                DT: newStaff,
                    username: account.username
            }
        } catch (error) {
            if (!t.finished) await t.rollback();
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    updateStaff = async (id, fullname, birth, gender, idNumber, startDate, phone, email) => {
        try {
            const staff = await db.Staff.findOne({
                where: {
                    id: id
                }
            });
            if (!staff) {
                return {
                    EM: 'Staff not found',
                    EC: 1,
                    DT: ''
                }
            }
            await db.Staff.update({
                fullname: fullname,
                email: email,
                birth: birth,
                gender: gender,
                idNumber: idNumber,
                startDate: startDate,
                phone: phone,
            },{                
                where: {
                    id: id
                }
            });

            const updatedStaff = await db.Staff.findOne({
                where: {
                    id: id
                }
            });
            return {
                EM: 'update staff successfully',
                EC: 0,
                DT: updatedStaff
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    deleteStaff = async (id) => {
        try {
            const staff = await db.Staff.findOne({
                where: {
                    id: id
                }
            });
            if (!staff) {
                return {
                    EM: 'Staff not found',
                    EC: 1,
                    DT: ''
                }
            }
            await db.Account.update({
                status: 'inactive'
            }, {
                where: {
                    id: staff.accountId
                }
            })
            return {
                EM: 'delete staff successfully',
                EC: 0,
                DT: ''
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    getStaff = async (id) => {
        try {
            const staff = await db.Staff.findOne({
                where: {
                    id: id
                },
                include: {
                    model: db.Account,
                    attributes: ['username', 'status'],
                    include:
                    [
                        {
                            model: db.Role,
                            attributes: ['name', 'id']
                        }
                    ]
                },
                raw: true,
                nest: true
            });
            if (!staff) {
                return {
                    EM: 'Staff not found',
                    EC: 1,
                    DT: ''
                }
            }
            return {
                EM: 'get staff successfully',
                EC: 0,
                DT: staff
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    getAllStaffs = async () => {
        try {
            const staffs = await db.Staff.findAll(
                {
                    include: {
                        model: db.Account,
                        attributes: ['username', 'status'],
                        include:
                        [
                            {
                                model: db.Role,
                                attributes: ['name', 'id']
                            }
                        ]
                    },
                    raw: false,
                    nest: true
                },
            );
            return {
                EM: 'get all staff successfully',
                EC: 0,
                DT: staffs
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

}
module.exports = new StaffService();