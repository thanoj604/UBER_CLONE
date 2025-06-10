const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [2, 'First name must be at least 2 characters long']
        },

        lastname:{
            type: String,
            minlength: [2, 'Last name must be at least 2 characters long']
        }
    },

    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },

    password:{
        type: String,
        required: true,
        select: false,
    },

    socketId:{
        type: String,
        default: null
    },


});


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}



const userModel = mongoose.model('User', userSchema);
module.exports = userModel;