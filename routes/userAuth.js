// const bcrypt = require('bcrypt');
const validateuser = require('../utils/validators')
const express = require('express');
const User = require('../modules/userSchema')

const authRoutre = express.Router()

authRoutre.post('/register', async (req, res) => {
    
    try {
        console.log(req.body);
        validateuser(req.body);

        // req.body.password = await bcrypt.hash(req.body.password,10);

        await User.create(req.body);
        res.send("User Created Successfully");
    }
    catch (err){
        res.send("Error: " + err.message)
    }

})

module.exports = authRoutre;