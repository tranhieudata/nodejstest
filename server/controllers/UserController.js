import mongoose from "mongoose";
import {user} from "../models/user.js";
// const MyModel = mongoose.model("tên dữ liệu data",user)

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const MyModel = mongoose.model("user",user)

class UserController {
    async create(req,res) {
        try {
            const accesstoken =  req.header.token
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(req.body.passwords, salt);
            const userData = new MyModel(req.body)
            userData.passwords = hash

            if(!userData) {
                res.status(404)
            }
            else {
                const saveData = await userData.save()
                res.status(200).json(saveData)
            }
        } catch (error) {
            res.status(500)
        }
    }
    async getall(req,res){
        try {
            const userData = await MyModel.find({});
            res.json(userData)
            
        } catch (error) {
            res.status(500)
        }
    }
    async getone(req,res){
        try {
            const id = req.params.id
            const userData = await MyModel.findById(id)
            if(!userData){

                res.status(400).json({error: "không tìm thấy id"});
                return
            }

            res.json(userData)
            
        } catch (error) {
            res.status(400).json({error: "err"});
        }
    }
    async profile(req,res){
        try {
            res.json(req.user)
            
        } catch (error) {
            res.status(404).json({error: "err"});
        }
    }
    async update(req,res) {
        const id = req.params.id
        const userData = await MyModel.findById(id);
        // const id = userData.id
        if(!userData){
            res.status(400).json({error: "không tìm thấy id"});
            return
        }
        const updateData = await MyModel.findByIdAndUpdate(id,req.body)
        
        res.json(updateData)
    }

    async delete(req,res) {
        const id = req.params.id
        const userData = await MyModel.findById(id);
        if(!userData){
            res.status(400).json({error: "Không tìm thấy id"});
            return
        }
        const updateData = await MyModel.findByIdAndDelete(id)
        res.json(updateData)
    }
    async login (req,res) {
        try {
        
            const user = await MyModel.findOne({email:req.body.email})
            if(!user) {
                res.status(404).json("Email is invalid")
            }
            else {
                if(await bcrypt.compare(req.body.passwords, user.passwords)){
                    const accesstoken = jwt.sign({id:user._id,admin:user.is_admin,name:user.name },process.env.SECRET_KEY)
                    res.cookie("accesstoken",accesstoken, {
                        httpOny:true
                        
                    })
                    res.status(200).json({noti:"dang nhap thanh cong",accesstoken})
                   
                }else{
                    res.status(403).json({noti:"dang nhap khong thanh cong"})
                }     
                };
            }catch (error) {
            res.status(500)
        }
    }
    async logout (req,res) {
        res.clearCookie("accesstoken").status(200).json("xóa cookie thanh cong")
    }
    
}
export {UserController}