require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const BookmarksService = require('./bookmarks-service')


const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/bookmarks', (req, res, next) => {
    const knexInstance = req.app.get('db')//getting the database
    BookmarksService.getAllBookmarks(knexInstance)
        .then(bookmark => {//grab the object into json string
            res.json(bookmark.map(bookmark => ({
                id: bookmark.id,
                title: bookmark.title,
                url: bookmark.url,
                rating: bookmark.rating,
                descriptiom: bookmark.descriptiom,

            })))
        })
        .catch(next)
})

app.get('/bookmarks/:bookmarks_id', (req, res, next) => {
    const knexInstance = req.app.get('db')
    BookmarksService.getById(knexInstance, req.params.bookmarks_id)
        .then(bookmark => {
            if (!bookmark) {
                return res.status(404).json({
                    error: { message: `Bookmark doesn't exist` }
                })
            }
        })
        .catch(next)
})

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } };
    } else {
        console.error(error)
        response = { message: error.message, error };
    }
    res.status(500).json(response);
})

module.exports = app;