const mongoose = require('mongoose');

const { Schema } = mongoose;

const sweaterSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  creater: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  tag: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
      required: true
    }
  ],
  sold: {
    type: Boolean,
    default: false
  }
});

const Sweater = mongoose.model('Sweater', sweaterSchema);

module.exports = Sweater;
