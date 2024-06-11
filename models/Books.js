const mongoose = require('mongoose');

const {Schema} = mongoose

const bookSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
  },
  users : [
    {
        type: Schema.Types.ObjectId,
        ref : 'user'
    }
  ]
});

module.exports = mongoose.model('book', bookSchema);
