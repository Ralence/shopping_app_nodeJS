const path = require('path');

const express = require('express');

const rootDir = require('../utils/rootPath');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;
