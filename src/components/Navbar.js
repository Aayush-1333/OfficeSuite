import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeButton from './ThemeButton'
import AccountContext from '../context/accounts/AccountContext'
import logo from './logo.png';

export default function Navbar() {

    const { logged, setLogged, directLogin, setAlert } = useContext(AccountContext);
    const navigate = useNavigate();


    /*
        Logins the user to his account
        
        If the user already has an authToken he'll get direct access to his account
        without even filling the details

        If the token is expired he will have to fill the details again

        If there is no authToken in localStorage he will have to fill
        the login form to generate a new authToken
    */
    const Login = async () => {
        if (localStorage.getItem('authToken')) {
            const result = await directLogin();

            if (result)
                navigate("/notes");
            else
                navigate('/login');
        }

        else
            navigate('/login');
    }

    /*
        Logs out the user and clears the token generated
        Also triggers the Alert component regarding log out status
    */
    const Logout = () => {
        localStorage.clear();
        setLogged(false);
        setAlert({
            status: 'visible',
            type: 'danger',
            msg: 'Logged out successfully'
        })
        navigate("/");
    }

    return (
        <div>
            {logged.status && <div className="container-fluid">
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasLabel">
                            Welcome <strong><em>{logged.username}</em></strong>
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <hr />
                    <div className="offcanvas-body">
                        <h3>Notes Section</h3>
                        <Link className="nav-link my-4" to="/notes">My Notes</Link>
                        <hr />
                        <h3>More Services</h3>
                        <Link className="nav-link my-4" to="/">Office Pro</Link>
                        <Link className="nav-link my-4" to="/">OfficeBuddy</Link>
                    </div>
                </div>
            </div>}

            <nav className="navbar navbar-expand-lg bg-body-tertiary p-4">
                <Link className="navbar-brand" to="/"><img src={logo} alt="brand logo" width="30" height="30" /> OfficeSuite</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" aria-current="page" to="/">Support</Link>
                        </li>

                        {logged.status && <li className='nav-item'><a className='nav-link fw-bold' data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvas">Dashboard</a></li>}

                        <li>
                            {!logged.status ? <button className='nav-link fw-bold'
                                onClick={Login}>Login</button> :
                                <button className='nav-link fw-bold' onClick={Logout}>Logout</button>}
                        </li>
                    </ul>

                    <div>

                    </div>

                    <ThemeButton />
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>

            </nav>

        </div >
    )
}
