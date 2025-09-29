const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Direccion = sequelize.define('Direccion', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cliente_id: { type: DataTypes.INTEGER },
  calle: { type: DataTypes.STRING(255) },
  ciudad: { type: DataTypes.STRING(100) },
  codigo_postal: { type: DataTypes.STRING(20) },
}, {
  tableName: 'direcciones',
  timestamps: false,
});

module.exports = Direccion;
