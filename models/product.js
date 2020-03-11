const fs = require('fs');
const path = require('path');

const rootPath = require('../utils/rootPath');
const filePath = path.join(rootPath, 'data', 'products.json');
const Cart = require('./cart');

const getProductsFromFile = cb => {
  fs.readFile(filePath, (error, fileContent) => {
    if (error) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save = () => {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(product => product.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProducts), error => {
          console.log(error);
        });
      } else {
        this.id = Math.random() + this.title;
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), error => {
          console.log(error);
        });
      }
    });
  };

  static deleteById = id => {
    getProductsFromFile(products => {
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), error => {
        if (!error) {
          Cart.deleteProduct(id);
        }
      });
    });
  };

  static fetchAll = cb => {
    getProductsFromFile(cb);
  };

  static findById = (id, cb) => {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      cb(product);
    });
  };
};
