const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  console.log(products);
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    products,
    productsExist: products.length > 0,
    pageTitle: 'Shop',
    path: '/',
  });
};
