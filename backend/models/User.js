// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  monthlyBudget: { type: Number, default: 0 },
  preferredCurrency: { type: String, default: 'USD' },
  notificationPref: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
