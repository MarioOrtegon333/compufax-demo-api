const Direccion = require('../models/direccion');
const sequelize = require('../config/db');

const getAllDirecciones = async () => {
  return await Direccion.findAll();
};

const getDireccionById = async (id) => {
  return await Direccion.findByPk(id);
};

const createDireccion = async (data) => {
  const t = await sequelize.transaction();
  try {
    const direccion = await Direccion.create(data, { transaction: t });
    await t.commit();
    return direccion;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const updateDireccion = async (id, data) => {
  const t = await sequelize.transaction();
  try {
    const [updated] = await Direccion.update(data, { where: { id }, transaction: t });
    await t.commit();
    const direccionActualizada = await Direccion.findByPk(id);
    return { updated, direccionActualizada };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const removeDireccion = async (id) => {
  const t = await sequelize.transaction();
  try {
    const deleted = await Direccion.destroy({ where: { id }, transaction: t });
    await t.commit();
    return deleted;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = {
  getAllDirecciones,
  getDireccionById,
  createDireccion,
  updateDireccion,
  removeDireccion
};
