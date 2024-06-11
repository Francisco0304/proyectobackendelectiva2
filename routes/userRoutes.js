const routes = require('express').Router();

const {
  findAll,
  save,
  findById,
  erase,
  update
} = require('./../controllers/controll-users');

routes.get('/', findAll);
routes.post('/:id', save);
routes.get('/:id', findById);
routes.delete('/:id', erase);

module.exports = routes;
