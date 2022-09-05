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
var fs = require('fs');

var router = express.Router();
var myData = Bookshelf.Model.extend({
    tableName: 'contents'
});

// Generate page
new myData().fetchAll().then((collection) => {
    // Generate main page of blog
    router.get('/', (req, res, next) => {
        var data = {
            content: collection.toArray(),
            array_len: collection.toArray().length,
        };
        res.render('blog/index', data);
    })
    // Generate each blog page
    var contents = collection.toArray();
    for (let i = 0; i < contents.length; i++) {
        // Add sitemap.xml
        var sitemap_content = '\n\
        <loc>https://zotokot.com/blog/' + contents[i].attributes.url + '</loc>\n\
        <lastmod>' + String(contents[i].attributes.updated_at).slice(0, 10) + '</lastmod>\
        ';
        fs.appendFileSync('./public/sitemap.xml', sitemap_content);

        router.get('/' + contents[i].attributes.url, (req, res, next) => {
            var data = {
                content: contents[i].attributes,
            };
            res.render('blog/blog', data);
        });

        // Add sitemap.xml
        if (i == contents.length - 1) {
            var sitemap_content = '\n    </url>\n</urlset>\n';
            fs.appendFileSync('./public/sitemap.xml', sitemap_content);
        }
    }
})
    .catch((err) => {
        // Generate error page
        router.get('/', (req, res, next) => {
            res.status(500).json({ error: true, data: { message: err.message } });
        })
    });

module.exports = router;
