const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        minlength: 3,
        required: true,
    },
    password: {
        type: String,
        minlength: 3,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    userImage: {
        type: String
    },
    }, {
        timestamps: true,
    });

    const User = mongoose.model('User', userSchema);
    module.exports = User;