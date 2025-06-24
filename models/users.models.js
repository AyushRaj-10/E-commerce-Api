import mongoose from "mongoose";
import lodash from 'lodash'
import validator from "validator";
import PasswordValidator from "password-validator";

const passwordRules = new PasswordValidator();
passwordRules
.is().min(6)
.is().max(32)
.has().lowercase()
.has().uppercase()
.has().not().spaces();

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate : {
            validator:validator.isEmail,
            message: "Enter a valid Email"
        }
    },
    password:{
        type: String,
        required:true,
        validator: function (value) {
            const isValid = passwordRules.validate(value);
            console.log("Password validation:", value, "=>", isValid);
            return isValid;
        }
    },
    accountType: {
        type: String,
        enum: ["personal", "professional"],
        default: "personal"
      }
},{timestamps:true})

export const User = mongoose.model("User",userSchema);