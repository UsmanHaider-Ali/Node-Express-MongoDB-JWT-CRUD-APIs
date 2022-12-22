const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);