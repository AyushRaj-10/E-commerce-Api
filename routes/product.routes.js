import express from 'express';
import { createProduct } from '../controllers/product.controllers.js';
import { checkProfessionalAccount } from '../middlewares/professional.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';


const productRouter = express.Router();

productRouter.post('/listProduct',verifyToken,checkProfessionalAccount, createProduct);

productRouter.get('/me', verifyToken, (req, res) => {
    res.status(200).json({ message: "Welcome", user: req.user });
  });
  

export default productRouter;
