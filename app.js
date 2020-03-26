const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(errorController.get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});
User.hasMany(Product);

sequelize
  //.sync({ force: true })
  .sync()
  .then(res => {
    // console.log(res);
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Rale', email: 'test@test.mail' });
    }
    return user;
  })
  .then(user => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
