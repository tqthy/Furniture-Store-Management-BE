import StaffService from "../services/StaffService";
class StaffController {

    createStaff = async (req, res) => {
        const { fullname, birth, gender, idNumber, startDate, phone, email, role } = req.body;
        if (!fullname || !birth || !gender || !idNumber || !startDate || !phone || !email || !role) 
        {
            return res.status(200).json({
                EM: 'Missing information',
                EC: '1',
                DT: ''
            });
        }

        try {
            const response = await StaffService.createStaff(fullname, birth, gender, idNumber, startDate, phone, email, role);
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    
    updateStaff = async (req, res) => {
        const { id } = req.params;
        const { fullname, birth, gender, idNumber, startDate, phone, email } = req.body;
        if (!id || !fullname || !birth || !gender || !idNumber || !startDate || !phone || !email) {
            return res.status(200).json({
                EM: 'Missing information',
                EC: '1',
                DT: ''
            });
        }
        try {
            const response = await StaffService.updateStaff(id, fullname, birth, gender, idNumber, startDate, phone, email);
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    deleteStaff = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                EM: 'Missing information',
                EC: '1',
                DT: ''
            });
        }
        try {
            const response = await StaffService.deleteStaff(id);
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    getAllStaffs = async (req, res) => {
        try {
            const response = await StaffService.getAllStaffs();
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    getStaff = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                EM: 'Missing information',
                EC: '1',
                DT: ''
            });
        }
        try {
            const response = await StaffService.getStaff(id);
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new StaffController();