const should = require('should');
const request = require('supertest');
const app = ('../app.js');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

const agent = request.agent(app);

describe('Book Crud Test', function () {
    it('Should allow a book to be posted and return a read and _id', function (done) {
        const bookPost = {title: 'new', author: 'aksdjksjf', genre: 'akdsjaksjd'};

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function (err, res) {
                console.log(err, '------------------');
                console.log(res, '++++++++++++++++++++');
                res.body.read.should.equal(false);
                res.body.should.have.property('_id');
                done();
            })
    })
        .afterEach(function (done) {
            Book.remove().exec();
            done();
        })
});