const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user_id: { type: String, required: true, index: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  created_at: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model('History', historySchema);
