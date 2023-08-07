/*
    The main page of backend where all services are present 

    Using express() the express server is started which handles all the requests and 
    responses using routes and database connection
*/
require('dotenv/config');
const cors = require('cors');
const express = require('express');
const ConnectToMongo = require('./db');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../build')));
app.use(cors());
app.use(express.json());


// Middleware - to display the endpoint currently the user is navigating
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes - `auth.js` and `notes.js`
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/news', require('./routes/news'));


// to serve index.html
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

// Connecting to MongoDB database at given PORT
ConnectToMongo(process.env.USER, process.env.PASSWD, process.env.HOST, process.env.DB_PORT, process.env.DB_NAME)
    .then(() => {
        console.log("Connected to database successfully!");
        app.listen(process.env.PORT, () => {
            console.log("Backend is listening at port", process.env.PORT);
        })
    })
    .catch((error) => {
        console.log({ error: error.message });
    })
