import React, { useContext, useEffect } from 'react'
import '../styles/HomePage.css'
import UpdatesItem from './UpdatesItem'
import Alert from './Alert'
import AccountContext from '../context/accounts/AccountContext'
import ThemeContext from '../context/themes/ThemeContext'

export default function HomePage() {

    const { alert, hideAlert } = useContext(AccountContext);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (alert.status)
            hideAlert();
    }, [alert.status])

    return (
        <div className={`homepage-${theme}`}>
            <Alert message={alert.msg} type={alert.type} visibility={alert.status} />
            <div>
                <h1 className='mx-4 bg-success p-2 rounded-4'>New Updates!</h1>
                <div className='container d-flex flex-column p-4'>
                    <UpdatesItem />
                    <UpdatesItem />
                    <UpdatesItem />
                </div>
            </div>
        </div>
    )
}
