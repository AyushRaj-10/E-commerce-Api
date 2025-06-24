import mongoose from "mongoose";
import PasswordValidator from "password-validator";


const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator: function (value){
            return /^[6-9]\d{9}$/.test(value);
        },
        message : "Phone number must be 10 digits",
    }
    },
    type:{
        type:String,
        enum:["personal", "professional"],
        default: "personal"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
},{timestamps:true})

export const contact = mongoose.model("contact",contactSchema)