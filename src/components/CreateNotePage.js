import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';
import MDEditor from '@uiw/react-md-editor';
import AccountContext from '../context/accounts/AccountContext';
import { useNavigate, Link } from 'react-router-dom';
import Alert from './Alert';

export default function CreateNotePage() {

	const { logged, alert, hideAlert } = useContext(AccountContext);
	const { createNote } = useContext(NoteContext);
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const navigate = useNavigate('/');


	// user gets logged out if session expires
	useEffect(() => {
		if (!logged.status) {
			localStorage.clear();
			navigate('/');
		}

		if (alert.status === 'visible')
			hideAlert();
	}, [logged.status, alert.status])

	const SubmitForm = (e) => {
		e.preventDefault();
		createNote({ title, description });
	}

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
			
			<div className='container my-4'>
				<form onSubmit={SubmitForm}>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Title</label>
						<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='title'
							onChange={handleTitleChange} value={title} />
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Description</label>
						<MDEditor
							className='border border-2 rounded-2'
							height="530px"
							value={description}
							onChange={setDescription}>
						</MDEditor>
					</div>
					<button type="submit" className="btn btn-success">Save Note</button>
				</form>
			</div>

		</div>
	)
}
