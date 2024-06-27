import {Router} from "express";
import { getallUsers,userSignup } from "../controllers/userController.js";

const userRouter=Router();

userRouter.get("/getalluser",getallUsers);
userRouter.post("/signup",userSignup);

export default userRouter