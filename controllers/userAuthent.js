const User = require('../modules/userSchema')
const bcrypt = require('bcrypt');
const validateuser = require('../utils/validators');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
     try {
            console.log(req.body);
            validateuser(req.body);

            const { name, email, password } = req.body;
            req.body.password = await bcrypt.hash(password,10);

            const user = await User.create(req.body);

            const token = jwt.sign({email:email,_id:user._id },"secretkey",{expiresIn:60*60}); // 1 hour expiration
            res.cookie('token',token, {maxAge: 60 * 60 * 1000, httpOnly: true}); // Set cookie with token
            res.send("User Created Successfully");
        }
        catch (err){
            res.send("Error: " + err.message)
        }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const user = await User.findOne({email});

        const match = await bcrypt.compare(password,user.password);

        if (!user || !match) {
            return res.status(401).send("Invalid email or password");
        }
 
        const token = jwt.sign({email:email,_id:user._id},"secreatkey",{expiresIn:60*60}); // 1 hour expiration
            res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true }); // Set cookie with token
            res.send("Login Successful");
         

    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }

}

const logout = (req, res) => {

    try{
        //validate tocken

    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}


// const profile = (req, res) => {

// }


module.exports = {
    register,
    login,
    logout
}





//  jwt.verify(user._id, "secretkey", (err, decoded) => {
//             if (err) {
//                 return res.status(500).send("Error verifying token: " + err.message);
//             }
//             const token = jwt.sign({email:email,_id:user._id});
//             res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true }); // Set cookie with token
//             res.send("Login Successful");
//         });