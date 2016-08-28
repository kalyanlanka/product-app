"use strict";
const Product = require('../models/product');

exports.insert = function(req,res,next){
  var product = new Product();
  product.name = req.body.name;
  product.type = req.body.type;
  product.description = req.body.description;
  product.isAvailable = req.body.isAvailable;

  Product.create(product,function(err,product){
    if (err) {
      res.status(400).json(err);
    } else {
      console.log(product)
      res.status(201).json(product);
    }
  });

}

exports.findByType = function(req,res,next){

}
