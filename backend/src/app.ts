import express from "express";
const app=express();

import {config} from "dotenv";
config();

import morgan from "morgan";
import appRouter from "./routes/mainRoutes.js";




app.use(express.json());
app.use(morgan("dev"));
app.use("api/v1/",appRouter)


export default app;

//mongodb+srv://paramtomar01:PARAMtomar123@cluster0.dis2nul.mongodb.net