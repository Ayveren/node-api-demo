const bookController = function (Book) {
    const post = function (req, res) {
        const book = new Book(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            book.save();
            res.status(201);
            res.send(book);
        }
    };

    const get = function (req, res) {
        let query = {};
        req.query.genre && (query.genre = req.query.genre);

        Book.find(query, function (err, books) {
            (err) && res.status(500).send(err);
            !err && res.json(books);
        });
    };
    return {post, get}
};

module.exports = bookController;