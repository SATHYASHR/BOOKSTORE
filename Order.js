const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      price: Number
    }
  ],
  total: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
