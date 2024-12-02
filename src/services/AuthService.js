
import db from "../models";
import SecurityService from "../utils/SecurityService";
import JwtService from '../middleware/JwtService';
import EmailService from "../utils/EmailService";
require("dotenv").config();
const expires = process.env.EXPIRES_FORGOTPASS;
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
            console.log(user.roleId);
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
                        role: user.roleId,
                        staffId: staff.id
                    }
                }
                else {
                    payload = {
                        id: user.id,
                        role: user.roleId,
                    }
                }
                let token = JwtService.createJwt(payload);
                return {
                    EM: "login successfully",
                    EC: 0,
                    DT: {
                        token: token,
                        staff,
                        role: user.roleId
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

    forgotPassword = async (email) => {
        try {
            const user = await db.Staff.findOne({
                where: {
                    email: email
                }
            });
            if (user === null) {
                return {
                    EM: "Email not found",
                    EC: 1,
                    DT: ""
                }
            }
            const token = SecurityService.generateResetPasswordToken();
            await db.Account.update({
                resetPasswordToken: token,
                resetPasswordExpires: new Date(Date.now() + parseInt(expires))
            },
            {
                where: {
                    id: user.accountId
                }
            });
            await EmailService.sendCustomEmail(email, "Reset Password For Funiture Shop", `Your reset password token is ${token}`);
            return {
                EM: "Token has been sent to your email",
                EC: 0,
                DT: ""
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ""
            }
        }
    }

    verifyForgotPasswordToken = async (token) => {
        try {
            const user = await db.Account.findOne({
                where: {
                    resetPasswordToken: token,
                    resetPasswordExpires: {
                        [db.Sequelize.Op.gt]: new Date()
                    }
                }
            });
            if (user === null) {
                return {
                    EM: "Token is invalid or has expired",
                    EC: 1,
                    DT: ""
                }
            }
            return {
                EM: "Verify token successfully",
                EC: 0,
                DT: ""
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ""
            }
        }
    }

    resetPassword = async (token, newPassword, retypeNewPassword) => {
        try {
            if (newPassword !== retypeNewPassword) {
                return {
                    EM: "Password does not match",
                    EC: 1,
                    DT: ""
                }
            }
            const hashPassword = SecurityService.hashUserPassword(newPassword);
            await db.Account.update({
                password: hashPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null
            },
            {
                where: {
                    resetPasswordToken: token
                }
            });
            return {
                EM: "Password has been reset",
                EC: 0,
                DT: ""
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ""
            }
        }
    }
}
module.exports = new AuthService();