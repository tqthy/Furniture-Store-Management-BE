
import db from "../models";
import SecurityService from "../utils/SecurityService";
import JwtService from '../middleware/JwtService';
class AuthService {
    login = async (username, password) => {
        try 
        {
            const user = await db.Account.findOne({
                where: {
                    username: username,
                    status: "active"
                }
            });
            if(user === null) {
                return {
                    EM: "username or password is incorrect or account has been locked",
                    EC: 1,
                    DT: null
                }
            }
            const isCorrectPass = SecurityService.checkPassword(password, user.password);
            if (isCorrectPass) {
                let payload = {};
                let staff;
                if (user.roleId == 3 || user.roleId == 4 || user.roleId == 5) {
                    staff = await db.Staff.findOne({
                        where: {
                            accountId: user.id
                        },
                        attributes: ['id','fullname', 'phone', 'email', 'gender']
                    })
                    payload = {
                        id: user.id,
                        role: user.role,
                        staffId: staff.id
                    }
                }
                else {
                    payload = {
                        id: user.id,
                        role: user.role,
                    }
                }
                let token = JwtService.createJwt(payload);
                return {
                    EM: "login successfully",
                    EC: 0,
                    DT: {
                        token: token,
                        staff
                    }
                }
            }
            else {
                return {
                    EM: "email or password is incorrect",
                    EC: 1,
                    DT: ""
                }
            }    
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: null
            }
        }
    }
}
module.exports = new AuthService();