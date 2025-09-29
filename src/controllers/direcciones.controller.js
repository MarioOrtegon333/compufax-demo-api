const Direccion = require('../models/direccion');
const sequelize = require('../config/db');

exports.getAll = async (req, res) => {
  const direcciones = await Direccion.findAll();
  res.json(direcciones);
};

exports.getById = async (req, res) => {
  const direccion = await Direccion.findByPk(req.params.id);
  res.json(direccion);
};

exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const direccion = await Direccion.create(req.body, { transaction: t });
    await t.commit();
    res.json({ success: "direccion creada", direccion });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    await Direccion.update(req.body, { where: { id: req.params.id }, transaction: t });
    await t.commit();
    const direccionActualizada = await Direccion.findByPk(req.params.id);
   
    res.json({ message: 'Dirección actualizada correctamente', data: direccionActualizada });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    await Direccion.destroy({ where: { id: req.params.id }, transaction: t });
    await t.commit();
    res.json({ message: 'Eliminado' });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};
