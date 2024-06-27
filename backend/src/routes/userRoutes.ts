import {Router} from "express";
import { getallUsers,userSignup,userLogin } from "../controllers/userController.js";
import {validate,signupValidator, loginValidator} from "../utils/validation .js"

const userRouter=Router();

userRouter.get("/getalluser",getallUsers);
userRouter.post("/signup",validate(signupValidator),userSignup);
userRouter.post("/login",validate(loginValidator),userLogin);

export default userRouter