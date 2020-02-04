const path = require('path');

const express = require('express');

const rootDir = require('../utils/rootPath');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  console.log(products);
  res.redirect('/');
});

module.exports = { router, products };
