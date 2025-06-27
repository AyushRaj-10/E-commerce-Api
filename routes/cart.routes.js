import express from 'express'
import {verifyToken} from '../middlewares/auth.middleware.js'
import {checkPersonalAccount} from "../middlewares/personal.middleware.js"
import { addToCart,deleteFromCart,getCart } from "../controllers/cart.controllers.js"

const cartRouter = express.Router();

cartRouter.post('/add',verifyToken,checkPersonalAccount,addToCart)
cartRouter.get('/', verifyToken, checkPersonalAccount,getCart);
cartRouter.delete('/remove',verifyToken,checkPersonalAccount,deleteFromCart)

export default cartRouter;