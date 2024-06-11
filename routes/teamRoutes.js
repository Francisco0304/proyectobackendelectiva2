const router = require('express').Router();

const {
    findAll,
    save,
    findById,
    findByName,
    update,
    erase
} = require('./../controllers/viewController');

router.get('/search', findByName); // Ruta para búsqueda por nombre
router.get('/', findAll);
router.post('/', save);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', erase);

module.exports = router;
