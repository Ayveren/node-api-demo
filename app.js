const express = require('express');

const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/bookAPI');

const Book = require('./models/bookModel');
const app = express();

const port = process.env.PORT || 3000;

const bookRouter = express.Router();

bookRouter.route('/books')
    .get(function (req, res) {

        let query = {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(books)
            }
        });
    });

bookRouter.route('/books/:bookId')
    .get(function (req, res) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(book)
            }
        });
    });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to API');
});

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});