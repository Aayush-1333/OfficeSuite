/*
    These are the backend routes for authentication of user accounts
    
    Routes:
    - Create Account (POST): Stores the new credentials in the MongoDB database to genreate new account
    - Get Account (POST): Returns an authToken which is stored in localStorage
    - Direct Login (POST): If token is valid the user will get direct access to his/her account

    `express-validator` is used to validate all the requests from the client's side
    `bcryptjs` is used to encrypt the password in the form of hash values in the database and
    `jsonwebtoken` is used to generate JSON web tokens as authTokens 
*/ 
const express = require('express');
const Accounts = require('../models/Accounts');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');


// creates a user account and validates all the fields
router.post('/create-account',
    body('username').isLength({ min: 5, max: 20 }),
    body('name').isLength({ min: 3, max: 40 }),
    body('phone').isMobilePhone().isLength({ min: 10, max: 10 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    async (req, res) => {
        try {
            const result = validationResult(req);

            // if errors are present after validation
            if (!result.isEmpty()) {
                console.log(result);
                return res.status(400).json(result);
            }

            // checking if the email is already associated with an account or not
            const account = await Accounts.findOne({ email: req.body.email });
            if (account)
                return res.status(400).json('Email already exists!')

            // generate salt and hash to encrypt the password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            // Create an new account and save it to the dtabase
            await Accounts.create({
                username: req.body.username,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hash
            })

            return res.status(200).json("Account created successfully!");

        } catch (error) {
            console.log(error);
            return res.status(500).json("Server Error: Cannot create account!");
        }
    }
)


// fetches the user's account using existing email id
router.post('/get-account',
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    async (req, res) => {
        const result = validationResult(req);

        // if errors are present after validation
        if (!result.isEmpty())
            return res.status(400).json(result);

        try {
            const account = await Accounts.findOne({ email: req.body.email });

            if (account) {

                // Checking the given password with the stored hash value
                if (bcrypt.compareSync(req.body.password, account.password)) {

                    // generate authToken
                    const authToken = jwt.sign({
                        data: { user: account._id }
                    }, "OffSuit88", { expiresIn: 60 * 60 });

                    return res.status(200).json({ username: account.username, authToken });
                }

                return res.status(401).json("Invalid Credentials!");
            }

            return res.status(400).json('Error: Account not found!')

        } catch (error) {
            return res.status(500).json("Server Error: Can't get user details!")
        }
    }
)


// Directly logins the user to his account, if the authToken is present and valid
router.post('/direct-login', fetchUser, async (req, res) => {
    try {
        const fetchedAccount = await Accounts.findById(req.user);
        return res.status(200).json(fetchedAccount);

    } catch (error) {
        return res.status(500).json("Server Error: Can't login directly!")
    }

})

module.exports = router;
