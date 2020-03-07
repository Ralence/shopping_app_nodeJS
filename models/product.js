const fs = require('fs');
const path = require('path');

const rootPath = require('../utils/rootPath');
const filePath = path.join(rootPath, 'data', 'products.json');

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save = () => {
    this.id = Math.random() + this.title;
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), error => {
        console.log(error);
      });
    });
  };

  static fetchAll = cb => {
    getProductsFromFile(cb);
  };
};
