import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/contants.js";
export const getallUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            msg: "success",
            users
        });
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: "fail",
            cause: err.message
        });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                msg: "User already exist"
            });
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // cookie and token
        // first clear prev cookie if there any
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        // provide token
        const token = createToken(user.id.toString(), user.email, "7d");
        // now send token in cookie
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/", // where cookie stored
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({
            msg: "user created successfully",
            id: user._id
        });
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: "fail",
            cause: err.message
        });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                msg: "User not registered"
            });
        }
        const ispassCorrect = await compare(password, user.password);
        if (!ispassCorrect) {
            return res.status(401).json({
                msg: "Incorrect password"
            });
        }
        // if user has login again then first clear prev cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        // provide token
        const token = createToken(user.id.toString(), user.email, "7d");
        // now send token in cookie
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/", // where cookie stored
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({
            msg: "user Login successfully",
            id: user._id
        });
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: "fail",
            cause: err.message
        });
    }
};
//# sourceMappingURL=userController.js.map