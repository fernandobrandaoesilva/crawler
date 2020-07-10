const express = require('express');

const CrawlerController = require('./controllers/CrawlerController');

const routes = express.Router();

// Crawler
routes.post( '/crawler', CrawlerController.search);


module.exports = routes;