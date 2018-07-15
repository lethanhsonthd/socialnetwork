const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: false
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: false,
        required: [true, "can't be blank"]
    } 
})  
mongoose.model('User', UserSchema)

module.exports = mongoose
