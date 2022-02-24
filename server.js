const express = require('express');
const { Agent } = require('http');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

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
    Title: String,
    Description: String,
    Number: Number,
    MyStringTag: String,
    MyNumberTag: Number,
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
        Title: req.body.Name,
        Description: req.body.Description,
        Number: req.body.NumberSelect,
        MyStringTag: "Placeholder String",
        MyNumberTag:0
    })
    console.log(req.body.NumberSelect);
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




//This is listening for post requests from the ToDoList.js
app.post('/api/save2', (req, res) => {

    console.log('Body: ', req.body)

    const dataM = req.body;
    console.log('check dataM Name: ' + dataM.Name)

    const newBlogPost = new BlogPost(dataM);
    console.log('check newBlogPost: ' + newBlogPost)

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, we got a problem' })
        } else {
            res.json({
                msg: "Your Data has been saved to the database"
            });
        }
    });


});


//----------------------------------------------------PORT CONNECTION----------------------------------------------------

app.listen(PORT, console.log(`Server is starting at port ${PORT}`));