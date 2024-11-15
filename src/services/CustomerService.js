import { where } from 'sequelize';
import db from '../models/index';
class CustomerService {
    createCustomer = async (name, phone, email) => {
        try {
            const customer = await db.Customer.create({
                name: name,
                phone: phone,
                email: email,
                point: 0,
                status: 'active'
            });
            return {
                EM: 'Create customer successfully',
                EC: 0,
                DT: customer
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }

    getAllCustomers = async () => {
        try {
            const customers = await db.Customer.findAll(
                {
                    where: {
                        status: 'active'
                    }
                }
            );
            return {
                EM: 'Get all customers successfully',
                EC: 0,
                DT: customers
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }

    getCustomer = async (id) => {
        try {
            const customer = await db.Customer.findOne({
                where: {
                    id: id
                }
            });
            return {
                EM: 'Get customer successfully',
                EC: 0,
                DT: customer
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }

    updateCustomer = async (id, name, phone, email) => {
        try {
            const customer = await db.Customer.update({
                name: name,
                phone: phone,
                email: email
            }, {
                where: {
                    id: id
                }
            });
            const updatedCustomer = await db.Customer.findOne({
                where: {
                    id: id
                }
            });
            return {
                EM: 'Update customer successfully',
                EC: 0,
                DT: updatedCustomer
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }

    deleteCustomer = async (id) => {
        try {
            const customer = await db.Customer.findOne({
                where: {
                    id: id
                }
            });
            if (!customer) {
                return {
                    EM: 'Customer not found',
                    EC: 1,
                    DT: ''
                };
            }
            await db.Customer.update(
                { status: 'inactive' },
                { where: {id: id}}
            );
            return {
                EM: 'Delete customer successfully',
                EC: 0,
                DT: ''
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }
}
module.exports = new CustomerService();