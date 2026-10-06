const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_details: { type: mongoose.Schema.Types.Mixed },
  total_price: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);