const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminData.router);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.status(404).render('404', { pageNotFound: 'Page not found 404', docTitle: '404 not found' });
});

app.listen(3000);
