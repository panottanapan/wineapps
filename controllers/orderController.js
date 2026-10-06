const Order = require('../models/Order');

exports.checkout = async (req, res) => {
  try {
    const { items, shippingInfo } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ error: 'Cart is empty.' });

    let totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder = new Order({
      order_details: { items, shippingInfo },
      total_price: totalPrice
    });

    await newOrder.save();
    res.json({ success: true, orderId: newOrder._id, message: 'Payment successful!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};