const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const sequelize = require('./utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.get404);

sequelize
  .sync()
  .then(res => {
    // console.log(res);
    app.listen(3000);
  })
  .catch(err => console.log(err));
