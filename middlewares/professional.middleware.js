import { User } from "../models/users.models.js";

export const checkProfessionalAccount = async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: User ID missing" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.accountType !== "professional") {
      return res.status(403).json({ success: false, message: "Access denied. Professional account required." });
    }

    next(); // ✅ allow access
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
