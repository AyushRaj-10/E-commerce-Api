import { Cart } from "../models/cart.models.js";
import { Product } from "../models/product.models.js";

export const addToCart =  async (req,res) => {
    try {
        const userId = req.user.userId;
        const {productId , quantity} = req.body;

        const product = await Product.findById(productId);
        if(!product || product.isDeleted){
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findById(userId);
        if(!cart){
            cart = new Cart({
                user : userId,
                items : [{product : productId , quantity}],
                total : product.price * quantity 
            })
        }
            else{
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
              } else {
                cart.items.push({ product: productId, quantity });
              }

              cart.total = 0;
            for (const item of cart.items) {
            const prod = await Product.findById(item.product);
            cart.total += prod.price * item.quantity;
      }

      }
      await cart.save();

      res.status(200).json({ message: "Product added to cart", cart });
      } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};


export const deleteFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    cart.items[itemIndex].quantity -= quantity;

    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    cart.total = 0;
    for (const item of cart.items) {
      const prod = await Product.findById(item.product);
      cart.total += prod.price * item.quantity;
    }

    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error: error.message });
  }
};



export const getCart = async (req, res) => {
    try {
      const userId = req.user.userId;
  
      const cart = await Cart.findOne({ user: userId })
        .populate({
          path: "items.product",
          model: "Product",
          select: "productName price category"
        });
  
      if (!cart || cart.items.length === 0) {
        return res.status(200).json({ message: "Cart is empty", cart: { items: [], total: 0 } });
      }
  
      res.status(200).json({
        success: true,
        cart
      });
  
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch cart", error: error.message });
    }
  };