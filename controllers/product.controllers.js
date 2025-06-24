import { Product } from "../models/product.models.js";

export const createProduct = async (req,res) => {
    try{
    const { productName, category, quantity, price, description, isAvailable, isDeleted} = req.body;

    const newProduct = new Product({
        productName, category, quantity, price, description, isAvailable, isDeleted, owner : req.user.userId
    });
    

    await newProduct.save();

res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};
