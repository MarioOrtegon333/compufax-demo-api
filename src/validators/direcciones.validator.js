const { body } = require('express-validator');

exports.createDireccionValidator = [
  body('cliente_id').isInt({ min: 1 }).withMessage('cliente_id es requerido y debe ser entero'),
  body('calle').notEmpty().withMessage('La calle es requerida'),
  body('ciudad').notEmpty().withMessage('La ciudad es requerida'),
  body('codigo_postal').notEmpty().withMessage('El código postal es requerido'),
];

exports.updateDireccionValidator = [
  body('cliente_id').optional().isInt({ min: 1 }),
  body('calle').optional().notEmpty(),
  body('ciudad').optional().notEmpty(),
  body('codigo_postal').optional().notEmpty(),
];
