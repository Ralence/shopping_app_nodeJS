const path = require('path');

const express = require('express');

const rootDir = require('../utils/rootPath');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {
    products,
    productsExist: products.length > 0,
    pageTitle: 'Shop',
    path: '/',
  });
});

module.exports = router;
