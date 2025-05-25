const express = require('express');
const { register, login, logout, profile } = require ('../controllers/userAuthent.js');
const userMiddleware = require('../middleware/userMiddleware.js');
const authRoutre = express.Router()

authRoutre.post('/register', register)
authRoutre.post('/login', login );
authRoutre.post('/logout', userMiddleware, logout);
// authRoutre.get('/profile', profile);



module.exports = authRoutre;