const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://luisG:12345@cluster0.9onvz5w.mongodb.net/Libros');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});

module.exports = db;

