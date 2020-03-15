const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        products: rows,
        productsExist: rows.length > 0,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, product => {
    res.render('shop/product-detail', {
      product,
      pageTitle: product.title,
      path: '/products',
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldDate]) => {
      res.render('shop/index', {
        products: rows,
        productsExist: rows.length > 0,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  const price = req.body.productPrice;
  console.log(productId);
  Cart.addProduct(productId, price);
  res.redirect('/cart');
  //Product.findById(productId, ())
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Cart.deleteProduct(productId);
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
