const express = require('express');

const routes = function (Book) {

    const bookRouter = express.Router();

    bookRouter.route('/')
        .post(function (req, res) {
            const book = new Book(req.body);
            book.save();
            res.status(201).send(book);

        })
        .get(function (req, res) {

            let query = {};
            if (req.query.genre) {
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

    return bookRouter;
};

module.exports = routes;