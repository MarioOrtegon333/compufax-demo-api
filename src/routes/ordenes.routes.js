const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenes.controller');


router.get('/', ordenesController.getAll);
router.get('/folio/:folio', ordenesController.getByFolio);
router.get('/:id', ordenesController.getById);
router.post('/', ordenesController.create);
router.put('/:id', ordenesController.update);
router.delete('/:id', ordenesController.remove);

module.exports = router;
