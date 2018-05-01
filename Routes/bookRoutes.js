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
            req.query.genre && (query.genre = req.query.genre);

            Book.find(query, function (err, books) {
                (err) && res.status(500).send(err);
                !err && res.json(books);
            });
        });

    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            err && res.status(500).send(err);
            !err && book && (req.book = book) && next();
            !err && !book && res.status(404).send('no book found');
        });
    });

    bookRouter.route('/:bookId')
        .get(function (req, res) {
            res.json(req.book);
        })
        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;

            req.book.save(function (err) {
                err && res.status(500).send(err);
                !err && res.json(req.book);
            });
        })
        .patch(function (req, res) {
            req.body._id && delete req.body._id;

            for (let p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.save(function (err) {
                err && res.status(500).send(err);
                !err && res.json(req.book);
            });
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                err && res.status(500).send(err);
                !err && req.status(204).send('Removed');
            });
        });

    return bookRouter;
};

module.exports = routes;