const express = require('express');
const main = require('./database');
require('dotenv').config();
const User = require('./modules/userSchema');
const authRoutre = require('./routes/userAuth');
// const validateuser = require('./utils/validators')


const app = express();
app.use(express.json());



app.use('/auth' , authRoutre)
// app.use('/task', taskRoutre);






main()

.then(async () => {
    console.log('Connected to MongoDB');

    app.listen(5500, () => {
        console.log('Server is running on port 5500');
    });
    
})

