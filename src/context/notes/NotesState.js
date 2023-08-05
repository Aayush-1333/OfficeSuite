import { useContext, useState } from 'react';
import NoteContext from './NoteContext';
import AccountContext from '../accounts/AccountContext';


const NoteState = (props) => {

    // URL of the backend for notes
    const URL = 'http://192.168.1.11:4000/api/notes';

    // Context variables
    const { logged, checkResponse, setAlert } = useContext(AccountContext);

    // ======== State variables ========
    const [notes, setNotes] = useState(null);
    const [editNote, setEditNote] = useState(null);
    const [editNoteData, setEditNoteData] = useState({
        title: '',
        description: ''
    })


    // fetches the notes of specific user using `user id`
    const getNotes = async () => {
        try {
            const response = await fetch(`${URL}`, {
                headers: {
                    'authToken': localStorage.getItem('authToken')
                }
            });

            checkResponse(response);
            const fetchedNotes = await response.json();
            setNotes(fetchedNotes);

        } catch (error) {
            console.log({ error: error.message });
        }
    }


    // creates the note and stores in the database
    const createNote = async (noteData) => {
        try {
            const response = await fetch(`${URL}/create-note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    user_id: logged.username,
                    title: noteData.title,
                    description: noteData.description
                })
            });

            checkResponse(response);
            const result = await response.json();
            if(response.ok) {
                setAlert({
                    status: 'visible',
                    type: 'success',
                    msg: 'Note created successfully!'
                });
            }
            else {
                setAlert({
                    status: 'visible',
                    type: 'danger',
                    msg: 'Invalid'
                });
            }

        } catch (error) {
            console.log({ error: error.message });
        }
    }


    // fetches the particular note from array of fetched notes using note id
    const fetchNoteById = (id) => {
        try {
            const fetchedNote = notes.filter((element) => {
                return element._id === id
            })

            setEditNoteData({
                title: fetchedNote[0].title,
                description: fetchedNote[0].description
            })

        } catch (error) {
            console.log("Server Error!")
            return '';
        }
    }


    // updates the note that has been fetched uisng fetchNoteById() function 
    const updateNote = async (data) => {
        try {
            const response = await fetch(`${URL}/edit-note/${editNote}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                },
                body: JSON.stringify({ ...data })
            })

            checkResponse(response);
            setAlert({
                status: 'visible',
                type: 'success',
                msg: "Note updated successfully!"
            })

        } catch (error) {
            console.log(error);
        }
        getNotes();
    }


    // deletes the particular note using note id 
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${URL}/delete-note/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            })

            checkResponse(response);
            setAlert({
                status: 'visible',
                type: 'danger',
                msg: 'Deleted successfully!'
            })
            getNotes();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <NoteContext.Provider value={{
            notes, setNotes, getNotes, createNote, setEditNote, fetchNoteById,
            editNoteData, updateNote, deleteNote
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
