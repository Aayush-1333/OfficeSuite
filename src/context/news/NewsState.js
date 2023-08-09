import AccountContext from '../accounts/AccountContext';
import NewsContext from './NewsContext';
const { useState, useContext } = require('react');

const NewsState = function (props) {

    // Context variable
    const { ipAddr } = useContext(AccountContext);

    // State variables
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(true);

    const getNews = async () => {
        const response = await fetch(`${ipAddr}/news`);
        const result = await response.json();

        // Logic to arrange news into rows of 3 articles each
        let fetchedArticles = [];
        let articlesRow = [];

        for (let i = 0; i < result.length; i++) {
            if (i % 3 === 0 && i !== 0) {
                fetchedArticles.push(articlesRow);
                articlesRow = [];
            }
            articlesRow.push(result[i]);
        }

        fetchedArticles.push(articlesRow);
        setArticles(fetchedArticles);
        setLoading(false);
    }

    const getByCategory = async (category) => {
        setLoading(true);
        const response = await fetch(`${ipAddr}/news/${category}`);

        const result = await response.json();
        let fetchedArticles = [];
        let articlesRow = [];

        for (let i = 0; i < result.length; i++) {
            if (i % 3 === 0 && i !== 0) {
                fetchedArticles.push(articlesRow);
                articlesRow = [];
            }
            articlesRow.push(result[i]);
        }

        fetchedArticles.push(articlesRow);
        setArticles(fetchedArticles);
        setLoading(false);
    }

    return (
        <NewsContext.Provider value={{ articles, getByCategory, getNews, loading }}>
            {props.children}
        </NewsContext.Provider>
    )
}

export default NewsState;
