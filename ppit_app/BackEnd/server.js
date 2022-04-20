const express = require('express');
const { Agent } = require('http');
// mongoose handle to connect with DB.
const mongoose = require('mongoose');
const path = require('path');
// Using cors, middleware to handle headers.
const cors = require('cors');
// Model handle.
const User = require('./models/user.model')
// JSON web tokens handle. For authentication and the use of JWD tokens.
const jwt = require('jsonwebtoken')
// Handle for bcrypt - password encryption for the DB. A hashing algorithm
const bcrypt = require('bcryptjs');
const { findByIdAndUpdate } = require('./models/user.model');

const app = express();
const PORT = process.env.PORT || 8080;
//----------------------------------------------------MONGOOSE CONNECTION-------------------------------------------------------
//Mongo database link
const MONGODB_URI = 'mongodb+srv://svetlin:svetlin@cluster0.mfk7y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//Initiating connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//Checks to make sure mongoos is connected (printing to console if it is connected)
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
})

//----------------------------------------------------OTHER CONNECTIONS-------------------------------------------------------

//This is making all requests that are coming in from client be available on "req.body" so we can parse it
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

//----------------------------------------------------MONGOOSE DATA STRUCTURE-------------------------------------------------------

//----------------------------------------------------User Register/Login Post----------------------------------------------------

app.post('/api/register', async (req, res) => {
    // Async function, using a try/catch clause should it fail.
    try {
        // Encrypting the password before the post. 10 cycles of the hashing algorithm.
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate Email' })
    }
})

// User login with token used for authentication.
app.post('/api/login', async (req, res) => {

    // Find the user, without the password.
    const user = await User.findOne({
        email: req.body.email,
    })

    // Checking if user is valid first.
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid user login' })
    }

    // Then, decryption at work. compare(from user, the associated PW with user)
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (isPasswordValid) {
        // If the user is legit. Issue them a token.
        const token = jwt.sign(
            {
                // The payload, this gets converted to a base64 string.
                name: user.name,
                email: user.email,
            },
            // Private key.
            'token123'
        )
        // Sending the token.
        return res.json({ status: 'ok', user: token })
    }
    else {
        return res.json({ status: 'error', user: false })
    }
})

// New endpoint with use of token. 
app.get('/api/quote', async (req, res) => {

    // Getting a handle on the locally stored token.
    const token = req.headers['x-access-token']

    try {
        // This verifies if the token is okay or not.
        const decoded = jwt.verify(token, 'token123')
        // Once we have the email, we can get the user.
        const email = decoded.email
        // Once we have the user we can get the quote.
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', quote: user.quote })
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

// Add the quote.
app.post('/api/quote', async (req, res) => {
    // Getting a handle on the locally stored token.
    const token = req.headers['x-access-token']

    try {
        // This verifies if the token is okay or not.
        const decoded = jwt.verify(token, 'token123')
        // Once we have the email, we can get the user.
        const email = decoded.email
        // Here we update one by setting quote with the body passed.
        await User.updateOne({ email: email }, { $set: { quote: req.body.quote } })

        return res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

//----------------------------------------------------PORT CONNECTION----------------------------------------------------

app.listen(PORT, console.log(`Server is starting at port ${PORT}`));