import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

export default function NoteItem(props) {
    const navigate = useNavigate();

    const { id, title } = props;
    const { setEditNote, fetchNoteById, deleteNote } = useContext(NoteContext);

    return (
        <div className='mx-4 my-4 border border-4 border-success rounded-4 p-4 note-page bg-tertiary'>
            <img src="https://th.bing.com/th/id/OIP.KhymBuaK4vfORCFHz3ILpQHaHy?w=178&h=187&c=7&r=0&o=5&pid=1.7" width="50" height="140" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title my-4">{title}</h5>

                <div className='d-flex justify-content-around align-items-center'>

                    <button onClick={() => {
                        setEditNote(id);
                        fetchNoteById(id);
                        navigate('/edit-note');
                    }} className="btn btn-outline-primary mx-2 note-btn">View Note</button>

                    <button onClick={() => {
                        deleteNote(id)
                    }} className="btn btn-outline-danger mx-2 note-btn">Delete Note</button>

                </div>
            </div>
        </div>
    )
}
