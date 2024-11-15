import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
class SecurityHandler {

    hashUserPassword = (userPass) => {
    let hashPassword = bcrypt.hashSync(userPass, salt);
    return hashPassword;
    };

    checkPassword = (inputPass, hashPass) => {
        return bcrypt.compareSync(inputPass, hashPass);
    };

}
module.exports = new SecurityHandler();