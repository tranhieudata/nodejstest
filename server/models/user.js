import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true,
    },
    passwords: {
        type:String,
        require:true,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["designer", "sale", "admin"],
    },
},{ timestamps: true })
export {user}