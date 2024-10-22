const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
});

module.exports = mongoose.model('Item', ItemSchema);
