const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail , 'filed must be valid email address']
    },
    password: {
        type: String,
        required: true
    },
    token : {
        type : String
    }
});

module.exports = mongoose.model('User',userSchema)