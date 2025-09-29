const { body } = require('express-validator');

exports.createOrdenValidator = [
  body('cliente_id').isInt({ min: 1 }).withMessage('cliente_id es requerido y debe ser entero'),
  body('items').isArray({ min: 1 }).withMessage('items debe ser un arreglo con al menos un producto'),
  body('items.*.producto').notEmpty().withMessage('El nombre del producto es requerido'),
  body('items.*.cantidad').isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo'),
];

exports.updateOrdenValidator = [
  body('cliente_id').optional().isInt({ min: 1 }),
  body('producto').optional().notEmpty(),
  body('cantidad').optional().isInt({ min: 1 }),
  body('folio').optional().notEmpty(),
];
