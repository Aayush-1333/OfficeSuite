import React, { useContext, useEffect } from 'react'
import NoteContext from '../../context/notes/NoteContext'
import AccountContext from '../../context/accounts/AccountContext';
import { Link, useNavigate } from 'react-router-dom'
import './NotesPage.css'
import NoteItem from './NoteItem';
import Alert from '../Home/Alert';

export default function NotesPage() {

  const { notes, getNotes } = useContext(NoteContext);
  const { logged, alert, hideAlert } = useContext(AccountContext);
  const navigate = useNavigate();

  const getAll = async () => {
    await getNotes();
  }

  // user gets logged out if session expires
  useEffect(() => {
    if (!logged.status) {
      localStorage.clear();
      navigate('/');
    }
    else
      getAll(); // fetch all notes

    if (alert.status)
      // trigger logged in alert
      hideAlert();

  }, [logged.status, alert.status])

  return (
    <div>
      <Alert message={alert.msg} type={alert.type} visibility={alert.status} />
      <div className='d-flex flex-row-reverse my-4 mx-4'><Link to="/create-note"><button className='btn btn-success'>+ Create Note</button></Link></div>

      <div className='container d-flex flex-row flex-wrap justify-content-around'>
        {notes !== null && logged.status && notes.length !== 0 ? notes.map(note => {
          return <NoteItem key={note._id} id={note._id} title={note.title} />
        }) : <h1>No notes</h1>}
      </div>
    </div>
  )
}
