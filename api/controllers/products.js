const mongoose = require("mongoose");

const Product = require("../models//products");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then((result) => {
      if (result.length > 0)
        res.send({
          message: "Products retrived successfully",
          success: true,
          data: result,
        });
      else
        res.send({
          message: "Products not found",
          success: false,
        });
    })
    .catch((error) => {
      res.send({
        message: "Something wrong",
        success: false,
      });
    });
};

exports.getOneProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .select("name price _id")
    .exec()
    .then((result) => {
      if (result)
        res.send({
          message: "Product retrived successfully",
          success: true,
          data: result,
        });
      else
        res.send({
          message: "Product not found",
          success: false,
        });
    })
    .catch((error) => {
      res.send({
        message: "Something wrong",
        success: false,
      });
    });
};

exports.addNewProduct = (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      res.send({
        message: "Product added successfully",
        success: true,
        data: result,
      });
    })
    .catch((error) => {
      res.send({
        message: "Something wrong",
        success: false,
      });
    });
};

exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.update(
    { _id: productId },
    { $set: { name: req.body.name, price: req.body.price } }
  )
    .exec()
    .then((result) => {
      if (result.matchedCount > 0)
        res.send({
          message: "Product updated successfully",
          success: true,
        });
      else
        res.send({
          message: "Product not found",
          success: false,
        });
    })
    .catch((error) => {
      res.send({
        message: "Something wrong",
        success: false,
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.remove({ _id: productId })
    .exec()
    .then((result) => {
      if (result.deletedCount > 0)
        res.send({
          message: "Product deleted successfully",
          success: true,
        });
      else
        res.send({
          message: "Product not found",
          success: false,
        });
    })
    .catch((error) => {
      res.send({
        message: "Something wrong",
        success: false,
      });
    });
};
