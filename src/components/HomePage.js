import React, { useContext, useEffect } from 'react'
import '../styles/HomePage.css'
import UpdatesItem from './UpdatesItem'
import Alert from './Alert'
import AccountContext from '../context/accounts/AccountContext'
import ThemeContext from '../context/themes/ThemeContext'
import NewsContext from '../context/news/NewsContext'

export default function HomePage() {

    const { alert, hideAlert } = useContext(AccountContext);
    const { theme } = useContext(ThemeContext);
    const { articles, getNews } = useContext(NewsContext);

    let keyId = 0;

    useEffect(() => {
        if (alert.status)
            hideAlert();

        if (!articles)
            getNews();

    }, [alert.status, articles])

    return (
        <div className={`homepage-${theme}`}>
            <Alert message={alert.msg} type={alert.type} visibility={alert.status} />
            <div>
                <h1 className='mx-4 bg-success p-2 rounded-4'>Latest News</h1>
                <div className='row'>
                    {articles ? articles.map(articleRow => {
                        return <UpdatesItem key={keyId++} data={articleRow} />
                    }) : "No news"}
                </div>
            </div>
        </div>
    )
}
