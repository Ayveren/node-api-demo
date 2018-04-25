const express = require('express');

const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/bookAPI');

const book = require('/model/bookModel');
const app = express();

const port = process.env.PORT || 3000;

const bookRouter = express.Router();

bookRouter.route('/books')
    .get(function (req,res) {
        const responseJSON = {hello: 'This is my api'};
        res.json(responseJSON)
    });

app.use('/api', bookRouter);



app.get('/', function(req, res){
    res.send('Welcome to API');
});

app.listen(port, function(){
    console.log('Running on PORT: ' + port);
});