const Orden = require('../models/orden');
const sequelize = require('../config/db');

function generarFolio() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return 'TEST' + random;
}

const getAllOrdenes = async () => {
  return await Orden.findAll();
};

const getOrdenById = async (id) => {
  return await Orden.findByPk(id);
};

const getOrdenesByFolio = async (folio) => {
  return await Orden.findAll({ where: { folio } });
};

const createOrden = async (cliente_id, items) => {
  if (!cliente_id || !Array.isArray(items) || items.length === 0) {
    throw new Error('cliente_id y items son requeridos');
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
    return { folio };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const updateOrden = async (id, data) => {
  const t = await sequelize.transaction();
  try {
    const [updated] = await Orden.update(data, { where: { id }, transaction: t });
    await t.commit();
    const ordenActualizada = await Orden.findByPk(id);
    return { updated, ordenActualizada };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const removeOrden = async (id) => {
  const t = await sequelize.transaction();
  try {
    const deleted = await Orden.destroy({ where: { id }, transaction: t });
    await t.commit();
    return deleted;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = {
  getAllOrdenes,
  getOrdenById,
  getOrdenesByFolio,
  createOrden,
  updateOrden,
  removeOrden
};
