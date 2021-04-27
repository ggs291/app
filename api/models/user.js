const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, require: [true]},
    email: {type: String, require: [true], unique: true},
    password:{type: String, require: [true]}
})


//VALIDATOR
userSchema.plugin(uniqueValidator, {message: 'Error, email already exist.'})


// Convert to model
const User = mongoose.model('User', userSchema)

export default User