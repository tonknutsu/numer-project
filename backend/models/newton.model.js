const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newtonSchema = new Schema({
  E: { type: String, required: true ,trim: true,unique: true  },
  E2: { type: String, required: true ,trim: true },
  x: { type: String, required: true , trim: true },
  xNew: { type: Array, required: true , trim: true },
  error: { type: Array, required: true , trim: true }
});

const Newton = mongoose.model('Newton', newtonSchema);

module.exports = Newton;