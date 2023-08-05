// This is the function to connect to Mongo database using the URI
const mongoose = require('mongoose');

// Connects to database using the given URI
const ConnectToMongo = async (user, passwd, host, dbPort, dbName) => {
    await mongoose.connect(`mongodb://${user}:${passwd}@${host}:${dbPort}/${dbName}?authMechanism=DEFAULT&authSource=${dbName}`);
}

module.exports = ConnectToMongo;
