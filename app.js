var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
var contactRouter = require('./routes/contact');
var blogRouter = require('./routes/blog');
var NotFoundRouter = require('./routes/404');

var app = express();

// Generate sitemap.xml
function getFileUpdatedDate(pathname){
    const stats = fs.statSync(pathname);
    return stats.mtime.toISOString().split('T')[0];
}
var path_index = './views/index.ejs';
var path_contact = './views/contact/';
var path_blog = './views/blog/';
var path_404 = './views/404.ejs';
var sitemap_content = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\
    <url>\n\
        <loc>https://zotokot.com/</loc>\n\
        <lastmod>' + getFileUpdatedDate(path_index) + '</lastmod>\n\
        <loc>https://zotokot.com/contact/</loc>\n\
        <lastmod>' + getFileUpdatedDate(path_contact) + '</lastmod>\n\
        <loc>https://zotokot.com/blog/</loc>\n\
        <lastmod>' + getFileUpdatedDate(path_blog) + '</lastmod>\n\
        <loc>https://zotokot.com/404/</loc>\n\
        <lastmod>' + getFileUpdatedDate(path_404) + '</lastmod>\
';
fs.writeFileSync('./public/sitemap.xml', sitemap_content);
console.log('"sitemap.xml" has generated.');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contact', contactRouter);
app.use('/blog', blogRouter);
app.use('/404', NotFoundRouter);

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
  res.status(404).render('404', {});
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
