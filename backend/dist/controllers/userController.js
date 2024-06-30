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
            name: user.name,
            email: user.email,
            password: user.password
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
            name: user.name,
            email: user.email,
            password: user.password
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
export const verifyUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=userController.js.map