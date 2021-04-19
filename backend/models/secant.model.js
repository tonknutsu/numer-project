const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const secantSchema = new Schema({
  E: { type: String, required: true ,trim: true ,unique: true },
  x0: { type: String, required: true ,trim: true },
  x1: { type: String, required: true , trim: true },
  XN: { type: Array, required: true , trim: true },
  error: { type: Array, required: true , trim: true }
});

const Secant = mongoose.model('Secant', secantSchema);

module.exports = Secant;