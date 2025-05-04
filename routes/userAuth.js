const validateuser = require('../utils/validators')
const express = require('express');
const User = require('../modules/userSchema')

const authRoutre = express.Router()

authRoutre.post('./register', async (req, res) => {
    
    try {

        validateuser(req.body);

        req.body.password = await bcrypt.hash(req.body.password,10);

        await User.create(req.body);
        res.status(201).send("User Created Successfully");
    }
    catch (err){
        res.send("Error"+err.massage)
    }

})

module.exports = authRoutre;