const express = require('express');
const router = express.Router();
const direccionesController = require('../controllers/direcciones.controller');

router.get('/', direccionesController.getAll);
router.get('/:id', direccionesController.getById);
router.post('/', direccionesController.create);
router.put('/:id', direccionesController.update);
router.delete('/:id', direccionesController.remove);

module.exports = router;
