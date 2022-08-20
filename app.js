var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
var formRouter = require('./routes/form');
var blogRouter = require('./routes/blog');

var app = express();

// Generate sitemap.xml
function getFileUpdatedDate(pathname){
    const stats = fs.statSync(pathname);
    return stats.mtime.toISOString().split('T')[0];
}
var path_index = './views/index.ejs';
var path_contact = './views/form/';
var path_blog = './views/blog/';
var sitemap_content = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\
    <url>\n\
        <loc>https://zotokot.com/</loc>\n\
        <lastmod>' + getFileUpdatedDate(path_index) + '</lastmod>\n\
        <loc>https://zotokot.com/contact/</loc>\n\
        <lastmod>' + getFileUpdatedDate(path_contact) + '</lastmod>\n\
        <loc>https://zotokot.com/blog/</loc>\n\
        <lastmod>' + getFileUpdatedDate(path_blog) + '</lastmod>\
';
fs.writeFileSync('./public/sitemap.xml', sitemap_content);
console.log('"sitemap.xml" has generated.');

//Generate robots.txt
var robots_content = '\
User-agent: *\n\
Disallow: /contact/\n\
\n\
sitemap: https://zotokot.com/sitemap.xml\n\
';

fs.writeFileSync('./public/robots.txt', robots_content);
console.log('"robots.txt" has generated.');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contact', formRouter);
app.use('/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
