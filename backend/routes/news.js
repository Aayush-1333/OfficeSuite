/*
    These are the backend routes for the news

    Routes:
    - Store News (GET): Fetches the news using API and stores the news in the database
    - Fetch News (GET): Fetches the news from the database
    - Fetch news by category (GET): Fetches the news by category from the database
*/
const express = require('express');
const router = express.Router();
const News = require('../models/News');
const jwt = require('jsonwebtoken');
const SECRET_NEWS_TOKEN = "newsboy55"
require('dotenv').config();
let newsToken = null;
const newsApi = process.env.NEWS_API_KEY


// Stores the news in the database
router.get('/store-news', async (req, res) => {

    try {
        const categories = [
            'general', 'business', 'health', 'entertainment',
            'science', 'sports', 'technology'
        ]

        // delete all data
        await News.deleteMany({});

        // generate a new news token
        newsToken = await jwt.sign({ newsData: "newsData" }, SECRET_NEWS_TOKEN, { expiresIn: '6h' });

        // store all types of news in database
        for (let cat of categories) {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=${newsApi}`);
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

        // returns a newsToken
        return res.status(200).json(newsToken);

    } catch (error) {
        return res.status(500).json("Internal Server Error!");
    }
})


// Fetches the general category news from the database
router.get('/', async (req, res) => {

    try {
        if (!newsToken) {
            const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/news/store-news`);
            newsToken = await response.json();
        }

        try {
            // checks if decoded data is present or not
            await jwt.verify(newsToken, SECRET_NEWS_TOKEN);

        } catch (error) {
            const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/news/store-news`);
            newsToken = await response.json();
        }

        // fetch articles
        const fetchedArticles = await News.find({ category: 'general' });

        if (fetchedArticles)
            return res.status(200).json(fetchedArticles);

        return res.status(404).json("Not found!");

    } catch (error) {
        return res.status(500).json("Internal Server Error!");
    }
})


// Fetches the news according to the specified category from the database 
router.get('/:category', async (req, res) => {

    try {

        try {
            await jwt.verify(newsToken, SECRET_NEWS_TOKEN);

        } catch (error) {
            const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/news/store-news`);
            newsToken = await response.json();
        }

        const fetchedArticlesByCategory = await News.find({ category: req.params.category });

        if (fetchedArticlesByCategory)
            return res.status(200).json(fetchedArticlesByCategory);

        return res.status(404).send("Not found!");
    }

    catch (error) {
        return res.status(500).send("Internal Server Error!");
    }
})

module.exports = router
