import {Router} from "express";
import { getallUsers,userSignup,userLogin,verifyUser,userLogout } from "../controllers/userController.js";
import {validate,signupValidator, loginValidator} from "../utils/validation .js"
import { verifyToken } from "../utils/token-manager.js";

const userRouter=Router();

userRouter.get("/getalluser",getallUsers);
userRouter.post("/signup",validate(signupValidator),userSignup);
userRouter.post("/login",validate(loginValidator),userLogin);
userRouter.post("/auth-status",verifyToken,verifyUser);

export default userRouter