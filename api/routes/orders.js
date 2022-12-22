const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/orders');

router.get('/get_all_orders', orderController.getAllOrders);

router.get('/get_one_order/:orderId', orderController.getOneOrder);

router.post('/add_new_order', checkAuth, orderController.addNewOrder);

router.patch('update_order/:orderId', (req, res, next) => {});

router.delete('/delete_order/:orderId', checkAuth, orderController.deleteOrder);

module.exports = router;