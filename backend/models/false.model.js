const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const falseSchema = new Schema({
  eq: { type: String, required: true ,trim: true,unique: true  },
  xl: { type: String, required: true ,trim: true },
  xr: { type: String, required: true , trim: true },
  XM: { type: Array, required: true ,trim: true },
  FXL: { type: Array, required: true , trim: true },
  FXR: { type: Array, required: true ,trim: true },
  FXM: { type: Array, required: true , trim: true },
  error: { type: Array, required: true , trim: true }
});

const False = mongoose.model('False', falseSchema);

module.exports = False;