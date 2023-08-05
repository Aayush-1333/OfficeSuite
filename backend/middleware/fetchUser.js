/*
    This is the middleware for handling the validation of authTokens
    Using jwt.verify() it checks the validity of the token using 
    the SECRET_API code 

    If it is valid it returns the decoded data (payload) of the token
    else, it will throw an error
*/
const jwt = require('jsonwebtoken');

// middleware to get user id from the authToken by decoding
const fetchUser = async (req, res, next) => {

    try {
        const authToken = req.header('authToken');

        if (!authToken)
            return res.status(401).json("Unauthorized!");

        try {
            const decoded = jwt.verify(authToken, "OffSuit88");
            req.user = decoded.data.user;
            next();

        } catch (error) {
            return res.status(401).json("Token is invalid due to expiration!")
        }

    } catch (error) {
        return res.status(500).json("Server Error!")
    }
}

module.exports = fetchUser;
