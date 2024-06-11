const { isObjectIdOrHexString, ObjectId } = require('mongoose');
const Books = require('../models/Books');

module.exports = {
  findAll: async (req, res) => {
    try {
      const result = await Books.find({}).populate('users'); // Usamos populate aquí
      return res.status(200).json({ data: result });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  save: async (req, res) => {
    try {
      const bookData = req.body; // Obtener los datos del libro desde el cuerpo de la solicitud
  
      // Crear un nuevo objeto de libro con los datos proporcionados
      const book = new Books(bookData);
  
      // Guardar el libro en la base de datos
      const result = await book.save();
  
      return res.status(201).json({ data: result });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },  

  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Books.findById(id).populate('users'); // Usamos populate aquí
      if (result) {
        return res.status(200).json({ data: result });
      } else {
        return res.status(404).json({ message: "El ObjectId no Existe" });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  findByName: async (req, res) => {
    try {
      const { name } = req.query;
      if (!name) {
        return res.status(400).json({ message: 'El parámetro "name" es requerido' });
      }
      const result = await Books.find({ name: new RegExp(name, 'i') }).populate('users');
      return res.status(200).json({ data: result });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, pages, author, status } = req.body;

      const query = await Books.findById(id);

      if (query) {
        const result = await Books.updateOne(
          { _id: id },
          { $set: { name, pages, author, status } }
        );

        return res.status(200).json({ msg: 'Libro actualizado correctamente' });
      } else {
        return res.status(404).json({ msg: 'El libro no existe' });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  erase: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedItem = await Books.findById(id);

      if (deletedItem) {
        const result = await Books.findByIdAndDelete(id);
        return res.status(200).json({ data: result });
      } else {
        return res.status(404).json({ message: "El ObjectId no Existe" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
