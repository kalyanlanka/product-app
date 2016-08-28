"use strict";
const Product = require('../models/product');

exports.insert = function(req,res,next){
  const product = new Product();
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

exports.query = function(req,res,next){

  const type = req.body.type;
  if (type){
    Product.find({
      type: type
    }).
    select({name:1,description: 1, isAvailable: 1}).
    exec(function(err,products){
      if (err){
          return res.status(400).json({status:'Fail',message:err});
      } else {
        if (products.length == 0){
            return res.status(400).json({status:'Fail',message:'No records found'});
        }
        return res.status(200).json(products);
      }
    });

  } else {
    return res.status(400).json({status:'Fail',message:'Type is required'});
  }

}
