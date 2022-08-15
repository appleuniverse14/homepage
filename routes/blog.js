var express = require('express');
var sqlite3 = require('sqlite3');
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'database/test.db',
    },
    useNullAsDefault: true,
});
var Bookshelf = require('bookshelf')(knex);

var router = express.Router();
var db = new sqlite3.Database('database/test.db');
var myData = Bookshelf.Model.extend({
    tableName: 'contents'
});

new myData().fetchAll().then((collection) => {
    collection.toArray().forEach(element => {
        element = element.attributes;
        var title = element.title;
        console.log("in title: " + title);
        router.get('/' + title, (req, res, next) => {
            var data = {
                title: 'Blog page!',
                content: element.content,
            };
            res.render('blog/blog', data);
        });
    });
});

router.get('/', (req, res, next) => {
    new myData().fetchAll().then((collection) => {
        var data = {
            title: 'Hello Blog!',
            content: collection.toArray(),
        };
        res.render('blog/index', data);
    })
        .catch((err) => {
            res.status(500).json({ error: true, data: { message: err.message } });
        });
});

for (let id = 1; id <= 2; id++) {
    router.get('/' + String(id), (req, res, next) => {
        new myData().where('id', '=', id).fetch().then((collection) => {
            var data = {
                title: 'Blog page!',
                content: collection,
            };
            res.render('blog/blog', data);
        })
    });
}

module.exports = router;
