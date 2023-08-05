import React, { useContext, useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import NoteContext from '../context/notes/NoteContext';
import { useNavigate, Link } from 'react-router-dom';
import AccountContext from '../context/accounts/AccountContext';
import Alert from './Alert';

export default function EditNotePage() {

    // Context variables and functions
    const { logged, alert, setAlert, hideAlert } = useContext(AccountContext);
    const { editNoteData, updateNote } = useContext(NoteContext);
    const [title, setTitle] = useState(editNoteData.title);
    const [description, setDescription] = useState(editNoteData.description);
    const navigate = useNavigate();

    // user gets logged out if session expires
    useEffect(() => {
        if (!logged.status) {
            localStorage.clear();
            navigate('/');
        }

        if (alert.status)
            hideAlert();
    }, [logged.status, alert.status])

    // Submits the form and prevents reloading of the page
    const SubmitForm = (e) => {
        e.preventDefault();

        if (title.length >= 5 && title.length <= 15)
            updateNote({ title, description })

        else {
            setAlert({
                status: 'visible',
                type: 'danger',
                msg: 'Title: 5 characters (min) and 15 characters (max)'
            })
        }
    }

    const ClearNote = () => {
        setTitle('');
        setDescription('');
    }

    // updates the title input value based on user's keystroke
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    return (
        <div>
            <div>
                <Alert message={alert.msg} type={alert.type} visibility={alert.status} />
            </div>

            <div>
                <Link to='/notes'><button className='btn btn-success mx-4'>&lt; My Notes</button></Link>
            </div>

            <form className='container p-4' onSubmit={SubmitForm}>
                <label className='form-label' htmlFor="title"><h1>Note Title</h1></label>
                <br />
                <input className='form-control py-2' type="text" name='title' value={title} onChange={handleTitleChange} />
                <br />
                <br />
                <label className='form-label' htmlFor="description"><h1>Description</h1></label>
                <MDEditor
                    className='border border-2 rounded-2'
                    height="530px"
                    value={description}
                    onChange={setDescription}
                />

                <div className='text-center'>
                    <button type='submit' className='btn btn-success mx-4 my-4'>Save</button>
                    <button type='button' onClick={ClearNote} className='btn btn-success mx-4 my-4'>Clear</button>
                </div>
            </form>

        </div>
    )
} 
