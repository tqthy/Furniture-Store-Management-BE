
import jwt from "jsonwebtoken";
import { toNamespacedPath } from "path";
require("dotenv").config();

const nonSecuredPath = ["/login", "/logout"];
class JwtService {

    createJwt = (payload) => {
        let key = process.env.JWT_SECRET;
        let token = null;
        try {
            token = jwt.sign({ payload }, key);
        } catch (e) {
            console.log(e);
        }
        return token;
    }

    verifyToken = (token) => {
        let key = process.env.JWT_SECRET;
        let decoded = null;
        try {
            decoded = jwt.verify(token, key);
        } catch (e) {
            console.log(e);
        }
        return decoded;
    }

    checkUserJwt = (req, res, next) => {
        if (nonSecuredPath.includes(req.path)) return next();
        let cookies = req.cookies;
        const tokenFromHeader = extractToken(req);
        if ((cookies && cookies.jwt) || tokenFromHeader) {
            let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
            let decoded = verifyToken(token);
            if (decoded) {
                //lấy user hiện tại: dùng req.user
                req.user = decoded.payload;
                //lấy token hiện tại: dùng req.token
                req.token = token;
                next();
            } else {
                return res.status(200).json({
                    EM: "Not authenticated user",
                    EC: 1,
                    DT: "",
                });
            }
        } else {
            return res.status(200).json({
                EM: "Not authenticated user",
                EC: 1,
                DT: "",
            });
        }
    };

    extractToken = (req) => {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            return req.headers.authorization.split(" ")[1];
        }
        return null;
    };

    checkUserPermission = (req, res, next) => {
        if (req.user) {
            let role = req.user.role;
            let currentUrl = req.route.path;
            console.log(currentUrl);
            if (!role || role.length === 0) {
                return res.status(401).json({
                    EM: "you have no permission to do this",
                    EC: -1,
                    DT: "",
                });
            }
            return next();
        } else {
            return res.status(401).json({
                EM: "Not authenticated user",
                EC: -1,
                DT: "",
            });
        }
    };
}
module.exports = new JwtService();