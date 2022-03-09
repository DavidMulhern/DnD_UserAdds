// Mongoose - Object Data Modeling library (ODM).
const mongoose = require('mongoose')

// Defining the schema.
const User = new mongoose.Schema(
    {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true}, // Ensure the email is unique. This will create an index in mongoDB (No duplicity).
    password: {type: String, required: true},
    quote: { type: String },
    },
    // Name of table/collection.
    { collection: 'user-data'} 
)

// Create the model. ('name given', Schema)
const model = mongoose.model('UserData', User)

// Export for use.
module.exports = model