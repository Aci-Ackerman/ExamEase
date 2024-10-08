const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function requireAuth(req, res, next) {
    try {
        // Read token off cookies
        const token = req.cookies.Authorization;

        // Decode token
        const decoded = jwt.verify(token, process.env.SECRET_JWT);

        // Check expiration
        if (Date.now() > decoded.exp) return res.sendStatus(401);

        // Find us er using the decoded sub
        const user = await User.findById(decoded.sub); 
        if (!user) return res.sendStatus(401);
        
        // Attach user to req
        req.user = user;
    
        console.log("In middleware");
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
}

module.exports = requireAuth;