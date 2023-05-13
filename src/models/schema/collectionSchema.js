const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
},{ timestamps: true });

module.exports = mongoose.model('Collection', collectionSchema);
