import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).send("Access denied. No token provided.")
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).send("Invalid or expired token");
    }
}