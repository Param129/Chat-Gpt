import {Router} from "express";
import { getallUsers } from "../controllers/userController.js";

const userRouter=Router();

userRouter.get("/",getallUsers);

export default userRouter