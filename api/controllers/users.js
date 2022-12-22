const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const checkAuth = require('../middleware/check-auth');

exports.registerUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.send({
                    message: 'User already exist',
                    success: false,
                });
            } else {
                bcrypt.hash(req.body.password, 10, (error, hash) => {
                    if (error) {
                        res.send({
                            message: 'Something wrong',
                            success: false,
                        });
                    } else {

                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                res.send({
                                    message: 'User registered successfully',
                                    success: true,
                                    data: result
                                });
                            })
                            .catch(error => {
                                res.send({
                                    message: 'Something wrong',
                                    success: false,
                                });
                            });
                    }
                });
            }
        })
        .catch(error => {
            res.send({
                message: 'Something wrong',
                success: false,
            });
        });
};

exports.loginUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(result => {
            if (result.length > 0) {
                bcrypt.compare(req.body.password, result[0].password, (hashError, hashRes) => {
                    if (hashRes) {
                        const token = jwt.sign({
                                email: result[0].email,
                                id: result[0]._id
                            },
                            'key', {
                                expiresIn: '1h',
                            }
                        );
                        res.send({
                            message: 'User logged in successfully',
                            success: true,
                            data: result[0],
                            token: token
                        });
                    } else {
                        res.send({
                            message: 'Password not matched',
                            success: false,
                        });
                    }
                });
            } else {
                res.send({
                    message: 'User not exist',
                    success: false,
                });
            }
        })
        .catch(error => {
            res.send({
                message: 'Something wrong',
                success: false,
            });
        });
};