const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/products');

exports.getAllOrders = (req, res, next) => {
    Order.find()
        .select('_id product quantity')
        .populate('product', '_id name')
        .populate('user', '_id email')
        .exec()
        .then(result => {
            if (result.length > 0)
                res.send({
                    message: 'Orders retrived successfully',
                    success: true,
                    data: result
                });
            else
                res.send({
                    message: 'Orders not found',
                    success: false,
                });
        })
        .catch();
};

exports.getOneOrder = (req, res, next) => {
    Order.findById(req.params.orderId)
        .select('_id product quantity')
        .populate('product', '_id name price')
        .exec()
        .then(result => {
            if (result)
                res.send({
                    message: 'Order retrived successfylly',
                    success: true,
                    data: result
                });
            else
                res.send({
                    message: 'Order not found',
                    success: false,
                });
        })
        .catch(error => {
            message: 'Something wrong'
            success: false
        });
};

exports.addNewOrder = (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.product,
        user: req.body.user
    });
    Product.findById(req.body.product)
        .exec()
        .then(result => {
            if (result)
                order.save()
                    .then(result => {
                        res.send({
                            message: 'Order created successfully',
                            success: true,
                            data: result
                        });
                    })
                    .catch(error => {
                        res.send({
                            message: 'Something wrong',
                            success: false
                        });
                    });
            else
                res.send({
                    message: 'Product not found',
                    success: false
                });
        })
        .catch(error => {
            res.send({
                message: 'Something wrong',
                success: false
            });
        });
};

exports.deleteOrder = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            if (result.deletedCount > 0)
                res.send({
                    message: 'Order deleted successfully',
                    success: true,
                });
            else
                res.send({
                    message: 'Order not found',
                    success: false,
                });
        })
        .catch(error => {
            res.send({
                message: 'Something wrong',
                success: false,
            });
        });
};