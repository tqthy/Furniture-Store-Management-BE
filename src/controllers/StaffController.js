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
}
module.exports = new StaffController();