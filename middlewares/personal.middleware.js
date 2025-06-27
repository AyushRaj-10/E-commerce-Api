import { User } from "../models/users.models.js";

export const checkPersonalAccount= async (req,res,next) => {
    try {
        const userId = req.user?.userId;

    if(!userId){
        res.send(401).json({
            message:"No User Id found!",
            success: false
        })
    };

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      if (user.accountType !== "personal") {
        return res.status(403).json({ success: false, message: "Access denied. Personal account required." });
      }
      next();
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }  
};