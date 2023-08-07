import React, { useContext, useEffect, useState } from 'react'
import AccountContext from '../context/accounts/AccountContext';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

export default function SignUpPage() {

    const navigate = useNavigate();
    const [accountData, setAccountData] = useState({
        username: '',
        name: '',
        phone: '',
        email: '',
        password: ''
    })
    const { createAccount, alert, setAlert, hideAlert } = useContext(AccountContext);

    useEffect(() => {
        if(alert.status)
            hideAlert();
    }, [alert.status])

    const SubmitForm = (e) => {
        e.preventDefault();

        if (accountData.phone.length !== 10 || !accountData.phone.isNaN()) {
            setAlert({
                status: 'visible',
                type: 'danger',
                msg: 'Invaild Phone number!'
            })
        }
        else if (accountData.name.length < 3 || accountData.name.length > 40) {
            setAlert({
                status: 'visible',
                type:'danger',
                msg: 'Invalid name length! min length = 3 max length = 40'
            })
        }
        else if (accountData.username.length < 3 || accountData.username.length > 20 ) {
            setAlert({
                status: 'visible',
                type: 'danger',
                msg: 'Invalid Username! min length = 3 and max length = 20'
            })
        }
        else if (accountData.password.length < 8) {
            setAlert({
                status: 'visible',
                type: 'danger',
                msg: 'Password too short!'
            })
        }
        else {
            createAccount({ ...accountData });
            navigate('/login')
        }

    }

    const handleChange = (e) => {
        setAccountData({ ...accountData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <Alert message={alert.msg} type={alert.type} visibility={alert.status} />
            <div className='d-flex justify-content-center'>
                <div className='container'>
                    <h1 className='text-center my-4'>Create Account</h1>
                    <form className='bg-warning-subtle container p-4 rounded-5' onSubmit={SubmitForm}>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username ( Should be different from your real name )</label>
                            <input type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" value={accountData.username} onChange={handleChange}
                                required min={5} max={20} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name ( 3 characters min. )</label>
                            <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={accountData.name} onChange={handleChange}
                                required min={3} max={40} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Mobile Number</label>
                            <input type="text" className="form-control" id="phone" name="phone" aria-describedby="emailHelp" value={accountData.phone} onChange={handleChange}
                                required min={10} max={10} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={accountData.email} onChange={handleChange}
                                required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password ( 8 characters min. )</label>
                            <input type="password" className="form-control" name="password" id="password"
                                value={accountData.password} onChange={handleChange} min={8} />
                        </div>

                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                            <label className="form-check-label" htmlFor="exampleCheck1">Agree to Terms and Conditions</label>
                        </div>

                        <button type="submit" className="btn btn-primary">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
