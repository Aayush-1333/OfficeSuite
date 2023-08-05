import React, { useContext, useState } from 'react'
import AccountContext from '../context/accounts/AccountContext';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {

    const navigate = useNavigate();
    const [accountData, setAccountData] = useState({
        username: '',
        name: '',
        phone: '',
        email: '',
        password: ''
    })
    const { createAccount } = useContext(AccountContext);

    const SubmitForm = (e) => {
        e.preventDefault();
        createAccount({ ...accountData });
        navigate('/login')
    }

    const handleChange = (e) => {
        setAccountData({ ...accountData, [e.target.name]: e.target.value });
    }

    return (
        <div className='d-flex justify-content-center'>
            <div className='container'>
                <h1 className='text-center my-4'>Create Account</h1>
                <form className='bg-warning-subtle container p-4 rounded-5' onSubmit={SubmitForm}>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username ( Should be different from your real name )</label>
                        <input type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" value={accountData.username} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name ( 3 characters min. )</label>
                        <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={accountData.name} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Mobile Number</label>
                        <input type="text" className="form-control" id="phone" name="phone" aria-describedby="emailHelp" value={accountData.phone} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={accountData.email} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password ( 8 characters min. )</label>
                        <input type="password" className="form-control" name="password" id="password"
                            value={accountData.password} onChange={handleChange} />
                    </div>

                    {/* <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div> */}

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                        <label className="form-check-label" htmlFor="exampleCheck1">Agree to Terms and Conditions</label>
                    </div>

                    <button type="submit" className="btn btn-primary">Create Account</button>
                </form>
            </div>
        </div>
    )
}
