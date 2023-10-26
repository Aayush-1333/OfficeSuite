// This is the function to connect to Mongo database using the URI
const mongoose = require('mongoose');

// Connects to database using the given URI
const ConnectToMongo = async (uri) => {
    await mongoose.connect(uri);
}

module.exports = ConnectToMongo;
