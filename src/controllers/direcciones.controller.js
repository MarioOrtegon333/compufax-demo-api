const direccionesService = require('../services/direcciones.service');

exports.getAll = async (req, res, next) => {
  try {
    const direcciones = await direccionesService.getAllDirecciones();
    res.json(direcciones);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const direccion = await direccionesService.getDireccionById(req.params.id);
    if (!direccion) {
      return res.status(404).json({ message: 'Dirección no encontrada' });
    }
    res.json(direccion);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const direccion = await direccionesService.createDireccion(req.body);
    res.json({ success: "direccion creada", direccion });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { updated, direccionActualizada } = await direccionesService.updateDireccion(req.params.id, req.body);
    if (updated) {
      res.json({ message: 'Dirección actualizada correctamente', direccion: direccionActualizada });
    } else {
      res.status(404).json({ message: 'Dirección no encontrada' });
    }
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await direccionesService.removeDireccion(req.params.id);
    if (deleted) {
      res.json({ message: 'Dirección eliminada' });
    } else {
      res.status(404).json({ message: 'Dirección no encontrada' });
    }
  } catch (err) {
    next(err);
  }
};
