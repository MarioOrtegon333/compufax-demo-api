const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Orden = sequelize.define('Orden', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cliente_id: { type: DataTypes.INTEGER },
  producto: { type: DataTypes.STRING(100) },
  cantidad: { type: DataTypes.INTEGER },
  fecha_pedido: { type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  folio: { type: DataTypes.STRING(50) },
}, {
  tableName: 'ordenes',
  timestamps: false,
});

module.exports = Orden;
