import mongoose from "mongoose";
import {user} from "../models/user.js";
// const MyModel = mongoose.model("tên dữ liệu data",user)

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const Authorization = (req,res,next) => {
    const accesstoken = req.cookies.accesstoken
    if (!accesstoken) {
        return res.status(403).json(" Accesstoken undefined")
    }
    // verify token
    try {
        jwt.verify(accesstoken, process.env.SECRET_KEY,(err, user)=>{
            if(!user) return res.status(403)
            req.user = user
        })
       
        next()
    }catch {
        res.status(403)
    }
}

export {Authorization}