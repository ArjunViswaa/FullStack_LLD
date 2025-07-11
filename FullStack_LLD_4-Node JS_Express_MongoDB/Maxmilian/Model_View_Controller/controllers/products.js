const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    prods: Product.fetchAll(),
    pageTitle: 'Shop',
    path: '/',
    hasProducts: Product.fetchAll().length > 0,
    activeShop: true,
    productCSS: true
  });
};