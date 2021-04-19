const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bisectionSchema = new Schema({
  eq: { type: String, required: true ,trim: true , unique: true},
  xl: { type: String, required: true ,trim: true },
  xr: { type: String, required: true , trim: true },
  xm: { type: Array, required: true ,trim: true },
  fxl: { type: Array, required: true , trim: true },
  fxr: { type: Array, required: true ,trim: true },
  fxm: { type: Array, required: true , trim: true },
  error: { type: Array, required: true , trim: true }
});

const Bisection = mongoose.model('Bisection', bisectionSchema);

module.exports = Bisection;