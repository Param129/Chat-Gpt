import User from "../models/User.js"
import {hash} from "bcrypt"




export const getallUsers= async (req,res,next)=>{
    try{
        const users =  await User.find();
        return res.status(200).json({
            msg:"success",
            users
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            msg:"fail",
            cause:err.message
        })
    }
}






export const userSignup =async(req,res,next)=>{
    try{

        const {name,email,password}=req.body;

        const hashedPassword = await hash(password,10);

        const user = new User({name,email,password:hashedPassword})

        await user.save();

        return res.status(201).json({
            msg:"user created successfully",
            id:user._id
        })

    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            msg:"fail",
            cause:err.message
        })
    }
}