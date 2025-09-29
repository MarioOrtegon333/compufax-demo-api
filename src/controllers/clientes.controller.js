const clientesService = require('../services/clientes.service');

exports.getAll = async (req, res, next) => {
  try {
    const clientes = await clientesService.getAllClientes();
    res.json(clientes);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const cliente = await clientesService.getClienteById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const cliente = await clientesService.createCliente(req.body);
    res.json({ success: "cliente creado", cliente });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { updated, clienteActualizado } = await clientesService.updateCliente(req.params.id, req.body);
    if (updated) {
      res.json({ message: 'Cliente Actualizado', cliente: clienteActualizado });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await clientesService.removeCliente(req.params.id);
    if (deleted) {
      res.json({ message: 'Cliente Eliminado' });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (err) {
    next(err);
  }
};
