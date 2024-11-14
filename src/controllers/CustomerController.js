import CustomerService from '../services/CustomerService';
class CustomerController {
    createCustomer = async (req, res) => {
        const { name, phone, email } = req.body;
        if (!name || !phone || !email) {
            return res.status(200).json({
                EM: 'Name, phone and email are required',
                EC: 1,
                DT: ''
            });
        }
        try {
            const result = await CustomerService.createCustomer(name, phone, email);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    getAllCustomers = async (req, res) => {
        try {
            const result = await CustomerService.getAllCustomers();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    getCustomer = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await CustomerService.getCustomer(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    updateCustomer = async (req, res) => {
        const { id } = req.params;
        const { name, phone, email } = req.body;
        if (!name || !phone || !email) {
            return res.status(200).json({
                EM: 'Name, phone and email are required',
                EC: 1,
                DT: ''
            });
        }
        try {
            const { name, phone, email } = req.body;
            const result = await CustomerService.updateCustomer(id, name, phone, email);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    deleteCustomer = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await CustomerService.deleteCustomer(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = new CustomerController();