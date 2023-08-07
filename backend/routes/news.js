const express = require('express');
const router = express.Router();
const News = require('../models/News');


router.get('/store-news', async (req, res) => {

    const categories = [
        'general', 'business', 'health', 'entertainment',
        'science', 'sports', 'technology'
    ]

    for (let cat of categories) {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=9b75a4da60ca464b94b21f2bcc74ae64`);

        const result = await response.json();
        for (let article of result.articles) {
            await News.create({
                category: cat,
                title: article.title,
                description: article.description || "No description",
                link: article.url,
                image: article.urlToImage
            });
        }
    }

    return res.status(200).send("All stored successfully!")
})


router.get('/', async (req, res) => {
    const fetchedArticles = await News.find({category: 'general'});

    if (fetchedArticles)
        return res.status(200).json(fetchedArticles);

    return res.status(404).send("Not found!");
})


router.get('/:category', async (req, res) => {
    const fetchedArticlesByCategory = await News.find({ category: req.params.category });

    if (fetchedArticlesByCategory)
        return res.status(200).json(fetchedArticlesByCategory);

    return res.status(404).send("Not found!");
})

module.exports = router
