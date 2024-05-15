import jwt from "jsonwebtoken";
import { createError } from '../error.js'

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return next(createError(401, "You Are Not Authorized"))
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return next(createError(401, "You Are Not Authenticated"));

        const decode = jwt.verify(token, process.env.jwt);
        req.user = decode;
        return next();

    } catch (err) {
        console.log(err);
    }
}
export default verifyToken