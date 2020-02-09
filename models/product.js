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
  constructor(title) {
    this.title = title;
  }

  save = () => {
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
