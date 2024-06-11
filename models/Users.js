const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'book'
  }
});

module.exports = mongoose.model('user', userSchema);
