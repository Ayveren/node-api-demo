const should = require('should');
const sinon = require('sinon');

describe('Book Controller Tests: ', function () {
    describe('Post', function () {
        it('should not allow an empty title on post', function () {
            const Book = function (book) {
                this.save = function () {
                }
            };

            const req = {
                body: {
                    author: 'Ayveren'
                }
            };

            const res = {
                status: sinon.spy(),
                send: sinon.spy()
            };
            const bookController = require('../Controllers/bookController')(Book);
            bookController.post(req, res);

            res.status.calledWith(400)
                .should.equal(true, 'Bad status ' + res.status.args[0]);

            res.send.calledWith('Title is required').should.equal(true);
        })
    });
});