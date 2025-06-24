import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { User } from '../models/users.models.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).send("Failed to fetch user");
  }
});


export default router;
