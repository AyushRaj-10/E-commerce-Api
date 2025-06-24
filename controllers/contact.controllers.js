import {contact} from '../models/contact.models.js'
import jwt from 'jsonwebtoken'

export const createContact = async (req,res) =>{
    try{
    let {email,name,phone,type} = req.body;

    let user = await contact.findOne({email});
    if(user){
        return res.status(400).send("User already exists!");
    }

    const newContact = new contact({
        email,
        name,
        phone,
        type,
        createdBy: req.user.userId
    });

    await newContact.save();
    const token = jwt.sign({email: newContact.email, userId : newContact._id},process.env.SECRET,{expiresIn:"1d"})
    res.cookie("token",token,{
        httpOnly:true,
        maxAge : 24*60*60*1000,
    })
    res.status(201).json({
      message: "Contact registered successfully",
      contact: newContact
    });
    
  } catch (error) {
    res.status(500).send("Registration error: " + error.message);
  }
}


export const getAllContact = async (req, res) => {
  try {
    const users = await contact.find({createdBy: req.user.userId}); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error: error.message });
  }
};

export const updateContact = async (req,res,next) => {
  try {
    let {userId} = req.params;
    let {email,name,phone,type} = req.body;

    let user = await contact.findByIdAndUpdate(
      userId,
      {email,
        name,
        phone,
        type
      },{
        new:true
      }
    );
    if(!user) return res.status(500).send("User does not exist!");

    res.status(200).json(user)

  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
}

export const deleteContact = async (req, res) => {
  let { userId } = req.params;

  try {
    let user = await contact.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.status(200).send("Contact deleted successfully.");
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};


export const getSpecificContact = async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await contact.findById(userId); 

    if (!user) {
    return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error: error.message });
  }
};