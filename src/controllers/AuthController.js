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
}
module.exports = new AuthController();