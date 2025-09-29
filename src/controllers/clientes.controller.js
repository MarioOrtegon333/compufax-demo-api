const Cliente = require('../models/cliente');
const sequelize = require('../config/db');

exports.getAll = async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
};

exports.getById = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  res.json(cliente);
};

exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const cliente = await Cliente.create(req.body, { transaction: t });
    await t.commit();
    res.json({ success: "cliente creado", cliente });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const [updated] = await Cliente.update(req.body, { where: { id: req.params.id }, transaction: t });
    await t.commit();
    const clienteActualizado = await Cliente.findByPk(req.params.id);
    if (updated) {
      res.json({ message: 'Cliente Actualizado', cliente: clienteActualizado });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    await Cliente.destroy({ where: { id: req.params.id }, transaction: t });
    await t.commit();
    res.json({ message: 'Cliente Eliminado' });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};
