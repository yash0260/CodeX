const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  code: { type: String, required: true },
  language: { type: String, required: true },
  result: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Analysis', analysisSchema);
