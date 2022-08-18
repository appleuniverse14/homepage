var express = require('express');
var sqlite3 = require('sqlite3');
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'database/blog.db',
    },
    useNullAsDefault: true,
});
var Bookshelf = require('bookshelf')(knex);

var router = express.Router();
var db = new sqlite3.Database('database/test.db');
var myData = Bookshelf.Model.extend({
    tableName: 'contents'
});

// Generate page
new myData().fetchAll().then((collection) => {
    // Generate main page of blog
    router.get('/', (req, res, next) => {
        var data = {
            content: collection.toArray(),
        };
        res.render('blog/index', data);
    })
    // Generate each blog page
    collection.toArray().forEach(element => {
        router.get('/' + element.attributes.title, (req, res, next) => {
            var data = {
                content: element.attributes,
            };
            res.render('blog/blog', data);
        });
    });
})
.catch((err) => {
    res.status(500).json({ error: true, data: { message: err.message } });
});

module.exports = router;
