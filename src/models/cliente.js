const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100) },
  apellido: { type: DataTypes.STRING(100) },
  edad: { type: DataTypes.INTEGER },
  email: { type: DataTypes.STRING(100) },
  fecha_registro: { type: DataTypes.DATE },
}, {
  tableName: 'clientes',
  timestamps: false,
});

module.exports = Cliente;
