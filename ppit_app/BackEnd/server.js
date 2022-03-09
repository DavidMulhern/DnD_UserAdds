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
const bcrypt = require('bcryptjs')

const app = express();
const PORT = process.env.PORT || 8080;
//
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
    console.log('Mongoos is connected');
})

//----------------------------------------------------OTHER CONNECTIONS-------------------------------------------------------

//This is making all requests that are coming in from client be available on "req.body" so we can parse it
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//----------------------------------------------------MONGOOSE DATA STRUCTURE-------------------------------------------------------
//Mongoose schema - A Mongoose schema defines the structure of the document, default values, validators, etc
//const Schema = mongoose.Schema;
// const BlogPostSchema = new Schema({
//     title: String,
//     body: String,
//     date: {
//         type: String,
//         default: Date.now()
//     }
// })

//Mongoose Model - provides an interface to the database for creating, querying, updating, deleting records, etc.
//const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
//The data being passed up as a model format. This is WRITING to the database
/*const data = {
    Name: 'This is the title being saved to mongoose',
    Description: 'This is the body data being saved to mongoose'
}*/



//Creating an instance of the model (required in order to allow us to use the save() method)
//const newBlogPost = new BlogPost(data);

//Save() method to push the data up to the database and save it
// newBlogPost.save((error)=>{
//     if(error){
//         console.log('Oooops, something went wrong. There has been an error');
//     }else{
//         console.log('Data has been saved!');
//     }
// })


app.use(cors());


//----------------------------------------------------HTTP ROUTES----------------------------------------------------------------


//Schema for the structure of the documents in the database
const Schema = mongoose.Schema;
var contentPostSchema = new Schema({
    value1: String,
    value2: String,
    value3: String,
    value4: String,
    value5: String,
    value6: String,
    date: {
        type: String,
        default: Date.now()
    }

})
//Model - used when we want to interact with the database
var contentPost = mongoose.model("Content", contentPostSchema)

//
//Listening POST for /api/songs
app.post('/api/save', (req, res) => {
    //Models are responsible for creating and reading documents from the underlying MongoDB database.
    contentPost.create({
        value1: req.body.value1,
        value2: req.body.value2,
        value3: req.body.value3,
        value4: req.body.value4,
        value5: req.body.value5,
        value6: req.body.value6,
    })
    
    //This sends a messaage back to ensure items added to the database are not added
    //multiple times by mistake
    res.send('Data Sent to Database!')
})


app.get('/api', (req, res) => {
    //Searches through mongo databse and returns all data in the "Blogpost" collection
    contentPost.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
        })
});

//----------------------------------------------------User Register/Login Post----------------------------------------------------

// User registration post to DB.
app.post('/api/register', async (req, res) => {
    
    // Delete log later.
    console.log(req.body)
    // Async function, using a try/catch clause should it fail.
    try {
        // Encrypting the password before the post. 10 cycles of the hashing algorithm.
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.json({status: 'ok'})
    } catch (err) {
        res.json({status: 'error', error: 'Duplicate Email'})
    }    
})

// User login with token used for authentication.
app.post('/api/login', async (req, res) => {
    
        // Find the user, without the password.
        const user = await User.findOne({
            email: req.body.email,
        })
        
        // Checking if user is valid first.
        if (!user){
            return { status: 'error', error: 'Invalid user login'}
        }

        // Then, decryption at work. compare(from user, the associated PW with user)
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

        if(user){
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
            return res.json({status: 'ok', user: token })
        } 
        else {
            return res.json({status: 'error', user: false})
        }
})

// New endpoint with use of token. 
app.get('/api/quote', async (req, res) => {

    // Getting a handle on the locally stored token.
    const token = req.headers['x-access-token']

    try{
        // This verifies if the token is okay or not.
        const decoded = jwt.verify(token, 'token123')
        // Once we have the email, we can get the user.
        const email = decoded.email
        // Once we have the user we can get the quote.
        const user = await User.findOne({email: email})

        return res.json({ status: 'ok', quote: user.quote })
    } catch(err){
        console.log(err)
        res.json({status: 'error', error: 'invalid token'})
    }
})

// Add the quote.
app.post('/api/quote', async (req, res) => {
    // Getting a handle on the locally stored token.
    const token = req.headers['x-access-token']

    try{
        // This verifies if the token is okay or not.
        const decoded = jwt.verify(token, 'token123')
        // Once we have the email, we can get the user.
        const email = decoded.email
        // Here we update one by setting quote with the body passed.
        await User.updateOne({email: email}, {$set: { quote: req.body.quote}})

        return res.json({ status: 'ok' })
    } catch(err){
        console.log(err)
        res.json({status: 'error', error: 'invalid token'})
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

// //This is listening for post requests from the ToDoList.js
// app.post('/api/save2', (req, res) => {

//     const dataM = req.body;
//     const newBlogPost = new BlogPost(dataM);

//     newBlogPost.save((error) => {
//         if (error) {
//             res.status(500).json({ msg: 'Sorry, we got a problem' })
//         } else {
//             res.json({
//                 msg: "Your Data has been saved to the database"
//             });
//         }
//     });


// });


//----------------------------------------------------PORT CONNECTION----------------------------------------------------

app.listen(PORT, console.log(`Server is starting at port ${PORT}`));