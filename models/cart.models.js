import mongoose, { Mongoose } from "mongoose";
import { User } from "./users.models.js";
import {Product} from  "./product.models.js"

const cartItemsSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true
    },
    quantity:{
        type: Number,
        required:true,
        min:1
    }
})

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    items: [cartItemsSchema],
    total:{
        type:Number,
        default:0
    }
},{timestamps:true})

export const Cart = mongoose.model("Cart",cartSchema)