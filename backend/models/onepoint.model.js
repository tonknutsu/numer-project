const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const onepointSchema = new Schema({
  E: { type: String, required: true ,trim: true,unique: true },
  x: { type: String, required: true ,trim: true },
  error: { type: Array, required: true ,trim: true }
});

const Onepoint = mongoose.model('Onepoint', onepointSchema);

module.exports = Onepoint;