const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const db = require('./utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

db.execute('SELECT * FROM products')
  .then()
  .catch();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.get404);

app.listen(3000);
