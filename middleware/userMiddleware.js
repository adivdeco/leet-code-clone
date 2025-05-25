
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 


const userMiddleware =async (req, res, next) => {

    try{
        //   const tocken = res.cookies.token || req.headers.authorization?.split(' ')[1]; // Check for token in cookies or Authorization header
        const {tocken} = req.cookies; // Extract token from cookies
        if (!tocken) {
            return res.status(401).send("Unauthorized: No token provided");
        }

       const payload  =  jwt.verify(tocken, "secretkey", (err, decoded) => {
            if (err) {
                return res.status(403).send("Forbidden: Invalid token");
            }
            req.user = decoded; // Attach user data to request object
            next(); // Call the next middleware or route handler
        });

        const {id} = payload; // Extract user ID from the token payload
        if (!id) {
            return res.status(401).send("Unauthorized: Invalid token payload");
        }

        const finduser = await User.findById(id); // Assuming you have a User model to find the user by ID
        if (!finduser) {
            return res.status(404).send("User not found");
        }

        const IsBlocked = await redisClint.exists(`blocked:${tocken}`); // Check if user is blocked in Redis
        if (IsBlocked) {
            return res.status(403).send("Forbidden: User is blocked");
        }
        res.finduser = finduser; // Attach the found user to the response object
        next(); 


    }
    catch(err) {
        res.status(500).send("Error: " + err.message);
    }
}

module.exports = userMiddleware;