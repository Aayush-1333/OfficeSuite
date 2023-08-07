const mongoose = require('mongoose');
const { Schema } = mongoose;


const NewsSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    image: {
        type: String
    },

    link: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('News', NewsSchema);