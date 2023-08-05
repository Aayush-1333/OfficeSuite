/*
    The main page of backend where all services are present 

    Using express() the express server is started which handles all the requests and 
    responses using routes and database connection
*/
const cors = require('cors');
const express = require('express');
const ConnectToMongo = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Middleware - to display the endpoint currently the user is navigating
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes - `auth.js` and `notes.js`
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// Connecting to MongoDB database at given PORT
ConnectToMongo()
    .then(() => {
        console.log("Connected to database successfully!");
        app.listen(4000, () => {
            console.log("Backend is listening at port", 4000);
        })
    })
    .catch((error) => {
        console.log({ error: error.message });
    })
