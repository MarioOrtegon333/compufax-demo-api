const Cliente = require('../models/cliente');
const sequelize = require('../config/db');

const getAllClientes = async () => {
  return await Cliente.findAll();
};

const getClienteById = async (id) => {
  return await Cliente.findByPk(id);
};

const createCliente = async (data) => {
  const t = await sequelize.transaction();
  try {
    const cliente = await Cliente.create(data, { transaction: t });
    await t.commit();
    return cliente;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const updateCliente = async (id, data) => {
  const t = await sequelize.transaction();
  try {
    const [updated] = await Cliente.update(data, { where: { id }, transaction: t });
    await t.commit();
    const clienteActualizado = await Cliente.findByPk(id);
    return { updated, clienteActualizado };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const removeCliente = async (id) => {
  const t = await sequelize.transaction();
  try {
    const deleted = await Cliente.destroy({ where: { id }, transaction: t });
    await t.commit();
    return deleted;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  removeCliente
};
