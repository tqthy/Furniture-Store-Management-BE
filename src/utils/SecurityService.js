import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
class SecurityService {

    hashUserPassword = (userPass) => {
    let hashPassword = bcrypt.hashSync(userPass, salt);
        return hashPassword;
    };

    checkPassword = (inputPass, hashPass) => {
        return bcrypt.compareSync(inputPass, hashPass);
    };

    generateResetPasswordToken() {
        return Math.floor(Math.random() * 900000) + 100000;
    }
}
module.exports = new SecurityService();