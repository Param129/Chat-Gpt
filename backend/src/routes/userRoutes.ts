import {Router} from "express";
import { getallUsers,userSignup } from "../controllers/userController.js";
import {validate,signupValidator} from "../utils/validation .js"

const userRouter=Router();

userRouter.get("/getalluser",getallUsers);
userRouter.post("/signup",validate(signupValidator),userSignup);

export default userRouter