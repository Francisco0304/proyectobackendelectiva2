const { isObjectIdOrHexString, ObjectId } = require('mongoose');
const User = require('../models/Users');  // Asegúrate de que la ruta sea correcta
const Book = require('../models/Books');

module.exports = {
  findAll: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({ data: users });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  findById: async (req, res) => {
    const { id } = req.params;

    if (!isObjectIdOrHexString(id)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.status(200).json({ data: user });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  save: async (req, res) => {
    const { id } = req.params;

    if (!isObjectIdOrHexString(id)) {
      return res.status(400).json({ message: "ID de libro inválido" });
    }

    try {
      const book = await Book.findById(id);

      if (!book) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }

      // Crear un nuevo usuario
      const user = new User(req.body);
      user.book = id;

      // Guardar el usuario y actualizar el libro con la referencia al usuario
      const result = await user.save();
      book.users.push(user._id);
      await book.save();

      return res.status(200).json({ data: result });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;

    if (!isObjectIdOrHexString(id)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.status(200).json({ data: updatedUser });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  erase: async (req, res) => {
    const { id } = req.params;

    if (!isObjectIdOrHexString(id)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      await Book.findOneAndUpdate(
        { users: id },
        { $pull: { users: id } }
      );

      return res.status(200).json({ data: deletedUser });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
};
