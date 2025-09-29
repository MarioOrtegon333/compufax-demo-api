const { body } = require('express-validator');

exports.createClienteValidator = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('apellido').notEmpty().withMessage('El apellido es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('edad').isInt({ min: 0 }).withMessage('Edad debe ser un número positivo'),
];

exports.updateClienteValidator = [
  body('nombre').optional().notEmpty(),
  body('apellido').optional().notEmpty(),
  body('email').optional().isEmail(),
  body('edad').optional().isInt({ min: 0 }),
];
