
import jwt from "jsonwebtoken";
import db from "../models";
require("dotenv").config();

class JwtService {

    createJwt = (payload) => {
        let key = process.env.JWT_SECRET;
        let token = null;
        try {
            token = jwt.sign({ payload }, key, { expiresIn: '30d' });
        } catch (e) {
            console.log(e);
        }
        return token;
    }

    checkUserJwt = (req, res, next) => {
        let cookies = req.cookies;
        const tokenFromHeader = extractToken(req);
        if ((cookies && cookies.jwt) || tokenFromHeader) {
            let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
            let decoded = verifyToken(token);
            if (decoded) {
                const route = `${req.baseUrl}${req.route.path}`;
                req.route = route;
                //lấy user hiện tại: dùng req.user
                req.user = decoded.payload;
                //lấy token hiện tại: dùng req.token
                req.token = token;
                next();
            } else {
                return res.status(200).json({
                    EM: "Not authenticated user",
                    EC: 2,
                    DT: "",
                });
            }
        } else {
            return res.status(200).json({
                EM: "Not authenticated user",
                EC: 2,
                DT: "",
            });
        }
    };

    checkUserPermission = async(req, res, next) => {
        if (req.user) {
            const route = req.route;
            const permmision = await db.Permission.findOne({
                include:[
                    {
                        model: db.RolePermission,
                        where: {
                            roleId: req.user.role,
                        }
                    },
                ],
                raw: true,
                nest: true,
                where: {
                    url: route,
                    method: req.method,
                }
            });
            if (!permmision) {
                return res.status(200).json({
                    EM: "you have no permission to do this",
                    EC: 2,
                    DT: "",
                });
            }
            next();
        } else {
            return res.status(200).json({
                EM: "Not authenticated user",
                EC: 2,
                DT: "",
            });
        }
    };
}

const extractToken = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (e) {
        console.log(e);
    }
    return decoded;
}
module.exports = new JwtService();