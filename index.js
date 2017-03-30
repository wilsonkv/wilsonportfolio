var express = require('express');
var mongoClient = require("mongodb").MongoClient;

var app = express();

var port = process.env.PORT || 5000;
var mongoURL = process.env.MONGOHQ_URL || "mongodb://127.0.0.1:27017/exampleDb"

var data = null;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Connect to the db
mongoClient.connect(mongoURL, function (err, db) { 
    if (err) {
        console.log(err);
    } else {
        db.collection('student', function (err, collection) {

            collection.findOne(function (err, items) {
                if (err) throw err;
                data = items;
                console.log(data);
            });

        });
    }


});


app.get('/', function (req, res) {
    res.render('index', data);
});

app.listen(port, function (err) {
    console.log('server started on port 5000');
});

module.exports.getApp = app;