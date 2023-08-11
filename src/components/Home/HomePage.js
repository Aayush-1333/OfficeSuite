import React, { useContext, useEffect } from 'react'
import './HomePage.css'
import UpdatesItem from './UpdatesItem'
import Alert from './Alert'
import AccountContext from '../../context/accounts/AccountContext'
import ThemeContext from '../../context/themes/ThemeContext'
import NewsContext from '../../context/news/NewsContext'
import loader from './loading.gif';

export default function HomePage() {

    const { alert, hideAlert } = useContext(AccountContext);
    const { theme } = useContext(ThemeContext);
    const { articles, getNews, loading } = useContext(NewsContext);

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
                {loading ? <div className='loading-page d-flex justify-content-center'><img className='text-center' src={loader} alt='loading' /></div> : <div className='row'>
                    {articles ? articles.map(articleRow => {
                        return <UpdatesItem key={keyId++} data={articleRow} />
                    }) : <h1 className='text-center my-3 loading-page'>No news</h1>}
                </div>}
            </div>
        </div>
    )
}
