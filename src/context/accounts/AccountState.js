import { useState } from 'react';
import AccountContext from './AccountContext'

const AccountState = (props) => {

    // URL of backend for the accounts
    const URL = "http://127.0.0.1:4000/api/auth";

    // =========== State variables ============
    const [logged, setLogged] = useState({
        status: false,
        username: ''
    });

    const [alert, setAlert] = useState({
        status: 'hidden',
        type: 'primary',
        msg: ''
    })

    // Hides the alert component after given seconds
    const hideAlert = () => {
        setTimeout(() => {
            setAlert({
                status: 'collapse',
                type: 'primary',
                msg: ''
            })
        }, 1500)
    }

    // checks response, if it is not ok the user will logout
    const checkResponse = (response) => {
        if (!response.status === 401) {
            setLogged({
                status: false,
                username: ''
            })

            setAlert({
                status: 'visible',
                type: 'danger',
                msg: 'Your current session expired! Please login again!'
            });
            console.log("Session expired!");
        }
    }


    // checks response, if it is not ok the user will logout and the function returns false, else true
    const checkResponseWithReturn = (response) => {
        if (!response.status === 401) {
            setLogged({
                status: false,
                username: ''
            })
            console.log("Session expired!");
            return false;
        }

        return true;
    }

    // calls the API to create the account
    const createAccount = async (data) => {
        try {
            const response = await fetch(`${URL}/create-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...data })
            });

            const result = await response.json()
            localStorage.setItem('authToken', result.authToken);
            console.log(result);

        } catch (error) {
            console.log({ error: error.message });
        }
    }


    // calls the API to get account details of desired user
    const getAccount = async (loginDetails) => {
        try {
            const response = await fetch(`${URL}/get-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...loginDetails })
            });

            const fetchedAccount = await response.json();

            if (fetchedAccount.username) {
                localStorage.setItem('authToken', fetchedAccount.authToken);

                setAlert({
                    status: 'visible',
                    type: 'success',
                    msg: "Logged in successfully!"
                })

                setLogged({
                    status: true,
                    username: fetchedAccount.username
                });
            }

            else if (response.status === 401 || response.status === 400) {
                setAlert({
                    status: 'visible',
                    type: 'danger',
                    msg: 'Invalid Credentials!'
                })
            }

        } catch (error) {
            console.log({ error: error.message });
        }
    }


    // provides direct login to the existing user if the token in localStorage is valid
    const directLogin = async () => {
        try {
            const response = await fetch(`${URL}/direct-login`, {
                method: 'POST',
                headers: {
                    'authToken': localStorage.getItem('authToken')
                }
            })

            const returnStatus = checkResponseWithReturn(response);

            if (returnStatus) {
                const account = await response.json();

                if (account.username) {
                    setAlert({
                        status: 'visible',
                        type: 'success',
                        msg: "Logged in successfully!"
                    })

                    setLogged({
                        status: true,
                        username: account.username
                    });
                }
            }

            return returnStatus;

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AccountContext.Provider value={{
            logged, setLogged, createAccount, getAccount, directLogin, checkResponse,
            alert, setAlert, hideAlert
        }}>
            {props.children}
        </AccountContext.Provider>
    )
}

export default AccountState;
