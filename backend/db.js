// This is the function to connect to Mongo database using the URI
const mongoose = require('mongoose');


// Connects to database using the given URI
const ConnectToMongo = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/office_suite");
}

module.exports = ConnectToMongo;
