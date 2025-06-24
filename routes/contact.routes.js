import express from 'express';
import { createContact, getAllContact, updateContact, deleteContact, getSpecificContact } from '../controllers/contact.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const contactRouter = express.Router();

contactRouter.post('/create',verifyToken, createContact);                    // Create contact
contactRouter.get('/all',verifyToken, getAllContact);                        // Get all contacts
contactRouter.get('/:userId',verifyToken, getSpecificContact);               // Get one contact by ID
contactRouter.put('/update/:userId',verifyToken, updateContact);             // Update contact
contactRouter.delete('/delete/:userId',verifyToken, deleteContact);          // Delete contact

contactRouter.get('/me', verifyToken, (req, res) => {
    res.status(200).json({ message: "Welcome", user: req.user });
  });

export default contactRouter;