import AuthService from '../services/AuthService';

class AuthController {
    login = async (req, res) => {
        try {
            const { username, password } = req.body;
            const result = await AuthService.login(username, password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const result = await AuthService.forgotPassword(email);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    verifyForgotPasswordToken = async (req, res) => {
        const { token } = req.body;
        if (!token) {
            return res.status(200).json({
                EM: 'Missing token',
                EC: '1',
                DT: ''
            });
        }
        try {
            const result = await AuthService.verifyForgotPasswordToken(token);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    resetPassword = async (req, res) => {
        const { token, newPassword, retypeNewPassword } = req.body;
        if (!token || !newPassword || !retypeNewPassword) {
            return res.status(200).json({
                EM: 'Missing required fields',
                EC: '1',
                DT: ''
            });
        }
        try {
            const result = await AuthService.resetPassword(token, newPassword, retypeNewPassword);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
module.exports = new AuthController();