const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
