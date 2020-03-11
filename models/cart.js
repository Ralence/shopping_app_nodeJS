const fs = require('fs');
const path = require('path');

const rootPath = require('../utils/rootPath');
const filePath = path.join(rootPath, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct = (id, productPrice) => {
    // fetch the previous cart
    fs.readFile(filePath, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // analyze the cart find the product if it already exists
      const existingProductIndex = cart.products.findIndex(product => product.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // add new product/increase the quantity
      if (existingProduct) {
        updatedProduct = {
          ...existingProduct,
        };
        updatedProduct.quantity = +existingProduct.quantity + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id,
          price: productPrice,
          quantity: 1,
        };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(filePath, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  };
  static deleteProduct = id => {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return;
      }
      const oldCart = JSON.parse(fileContent);
      const updatedCart = { ...oldCart };
      const productToDelete = updatedCart.products.find(product => product.id === id);
      const quantity = productToDelete.quantity;
      updatedCart.totalPrice = updatedCart.totalPrice - productToDelete.price * quantity;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedCart), error => {
        console.log(error);
      });
    });
  };
};
