import express from "express";
const app=express();

import {config} from "dotenv";
config();

import morgan from "morgan";
import appRouter from "./routes/mainRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";


app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/gpt/v1/",appRouter)


export default app;

//mongodb+srv://paramtomar01:PARAMtomar123@cluster0.dis2nul.mongodb.net