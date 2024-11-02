import db from '../models/index';
class CustomerService {
    createCustomer = async (name, phone, email) => {
        try {
            const customer = await db.Customer.create({
                name: name,
                phone: phone,
                email: email,
                point: 0
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
            const customers = await db.Customer.findAll();
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
}
module.exports = new CustomerService();