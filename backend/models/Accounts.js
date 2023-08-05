/*
    `Accounts Schema` for the Accounts collection in the MongoDB database

    Fields:
    - username (String): Username for the account
    - name (String): Full Name of the user (real name)
    - email (String): Email address of the user
    - password (String): Password for the account (encrypted using hash function)

    All fields are neccessary
*/
const mongoose = require('mongoose');
const { Schema } = mongoose

const AccountSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Accounts', AccountSchema);
