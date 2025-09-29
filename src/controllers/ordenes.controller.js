const Orden = require('../models/orden');
const sequelize = require('../config/db');


exports.getAll = async (req, res) => {
  const ordenes = await Orden.findAll();
  res.json(ordenes);
};

exports.getById = async (req, res) => {
  const orden = await Orden.findByPk(req.params.id);
  res.json(orden);
};

exports.getByFolio = async (req, res) => {
  const folio = req.params.folio;
  try {
    const ordenes = await Orden.findAll({ where: { folio } });
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.create = async (req, res) => {
  const { cliente_id, items } = req.body;
  if (!cliente_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'cliente_id y items son requeridos' });
  }
  const folio = generarFolio();
  const t = await sequelize.transaction();
  try {
    for (const item of items) {
      await Orden.create({
        cliente_id,
        producto: item.producto,
        cantidad: item.cantidad,
        folio
      }, { transaction: t });
    }
    await t.commit();
    res.json({ folio });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    await Orden.update(req.body, { where: { id: req.params.id }, transaction: t });
    await t.commit();
    const ordenActualizada = await Orden.findByPk(req.params.id);
    
    res.json({ message: 'Orden actualizada correctamente', orden: ordenActualizada });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    await Orden.destroy({ where: { id: req.params.id }, transaction: t });
    await t.commit();
    res.json({ message: 'Eliminado' });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};


function generarFolio() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return 'TEST' + random;
}
