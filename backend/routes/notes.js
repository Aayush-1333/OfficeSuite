/*
    These are the backemd routes for the notes 

    Routes:
    - Get all notes (GET)
    - Create Note (POST)
    - Edit Note using ID (PUT)
    - Delete Note using ID (DELETE)

    `express-validator` is used to validate all the requests from the client's side
*/
const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');


// fetches all the notes associated with the user account's id
router.get('/', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user_id: req.user });
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json("Server Error: Couldn't fetch notes");
    }
})


// creates a note and store it in the database
router.post('/create-note', fetchUser,
    body('title').isLength({ min: 5, max: 15 }),
    async (req, res) => {
        try {

            // checking errors in inputs
            const result = validationResult(req)

            // if errors are present
            if (!result.isEmpty()) {
                console.log(result)
                return res.status(400).json(result);
            }

            // create a new note in the collection
            const newNote = await Notes.create({
                user_id: req.user,
                title: req.body.title,
                description: req.body.description
            })

            return res.status(200).json(newNote);

        } catch (error) {
            return res.status(500).json("Server Error: Cannot create note!")
        }
    })


// Edits the note using the note's id
router.put('/edit-note/:id', fetchUser,
    body('title').isLength({ min: 5, max: 15 }),
    body('description'),
    async (req, res) => {
        try {
            const result = validationResult(req)

            if (!result.isEmpty())
                return res.status(400).json(result)

            const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {
                ...req.body
            }, { returnOriginal: false })

            return res.status(200).json(updatedNote);
        } catch (error) {
            res.status(500).json("Server Error!")
        }
    })


// Deletes the note using the note's id
router.delete('/delete-note/:id', fetchUser, async (req, res) => {
    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);

        return res.status(200).json(deletedNote);
    } catch (error) {
        res.status(500).json("Server Error!")
    }
})

module.exports = router
