import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AccountContext from '../../context/accounts/AccountContext'
import Alert from '../Home/Alert';

export default function LoginPage() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const { getAccount, logged, alert, hideAlert } = useContext(AccountContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (logged.status)
            navigate('/notes');

        if (alert.status === 'visible') {
            hideAlert();
        }
    }, [logged.status, alert.status])

    const SubmitForm = async (e) => {
        e.preventDefault();
        await getAccount({ ...loginData });
    }

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <Alert message={alert.msg} type={alert.type} visibility={alert.status} />
            <div className='d-flex justify-content-center'>
                <div className='container'>
                    <h1 className='text-center my-4'>User Login</h1>
                    <form className='bg-warning-subtle container p-4 rounded-5' onSubmit={SubmitForm}>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={handleChange} value={loginData.email} required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password'
                                onChange={handleChange} value={loginData.password} required min={8} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>

                        <p className='text-center my-4'>Don't have an Account? <Link to='/sign-up'>SignUp</Link></p>
                    </form>
                </div>
            </div>

        </div>
    )
}
