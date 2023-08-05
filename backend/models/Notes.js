/*
    `Notes Schema` for the Notes collection in MongoDB database

    Fields:
    - user id (String): Id of the user's account
    - title (String): Title of the Note
    - description (String): Description of the Note
    - date (Date object): Date of Note's creation

    First three fields are neccessary, date is taken by default
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;


const NoteSchema = new Schema({

    user_id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: new Date().toJSON()
    }
})

module.exports = mongoose.model('Notes', NoteSchema);
