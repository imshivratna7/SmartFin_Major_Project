const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Link to the user
  type: { type: String, required: true }, // e.g., SIP, stock, gold, etc.
  amount: { type: Number, required: true }, // Investment amount
  date: { type: Date, required: true }, // Investment date
  description: { type: String }, // Optional description
  currentGrowthRate: { type: Number, default: 0 }, // Growth rate in percentage
});

module.exports = mongoose.model('Investment', investmentSchema);
