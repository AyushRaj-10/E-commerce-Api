import bcrypt from 'bcrypt';
import { User } from '../models/users.models.js';
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, accountType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      accountType
    });

    await newUser.save();
    const token = jwt.sign({email: newUser.email, userId : newUser._id}, process.env.SECRET, {expiresIn:"1d"})
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        message: "User registered successfully",
        user: newUser
      });
      
  } catch (error) {
    res.status(500).send("Registration error: " + error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(403).send("User does not exist!");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }
    
    const token = jwt.sign({email : existingUser.email, userId : existingUser._id}, process.env.SECRET, {expiresIn:"1d"})
    res.cookie("token", token, {
        httpOnly:true,
        maxAge : 24*60*60*1000
    })

    res.status(200).send("Login successful!");
  } catch (error) {
    res.status(500).send("Login error: " + error.message);
  }
};
