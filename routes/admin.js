const path = require('path');

const express = require('express');

const rootDir = require('../utils/rootPath');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;
