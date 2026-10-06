const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
  winery: { type: String, default: 'Winery' },
  name: { type: String, required: true },
  type: { type: String },
  region: { type: String },
  country: { type: String },
  price: { type: Number },
  rating: { type: Number, default: 5.0 },
  ratings_count: { type: Number, default: 0 },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Wine', wineSchema);