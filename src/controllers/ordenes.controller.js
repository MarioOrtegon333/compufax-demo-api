const ordenesService = require('../services/ordenes.service');


exports.getAll = async (req, res, next) => {
  try {
    const ordenes = await ordenesService.getAllOrdenes();
    res.json(ordenes);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const orden = await ordenesService.getOrdenById(req.params.id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }
    res.json(orden);
  } catch (err) {
    next(err);
  }
};

exports.getByFolio = async (req, res, next) => {
  try {
    const ordenes = await ordenesService.getOrdenesByFolio(req.params.folio);
    res.json(ordenes);
  } catch (err) {
    next(err);
  }
};


exports.create = async (req, res, next) => {
  const { cliente_id, items } = req.body;
  try {
    const result = await ordenesService.createOrden(cliente_id, items);
    res.json(result);
  } catch (err) {
    if (err.message === 'cliente_id y items son requeridos') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { updated, ordenActualizada } = await ordenesService.updateOrden(req.params.id, req.body);
    if (updated) {
      res.json({ message: 'Orden actualizada correctamente', orden: ordenActualizada });
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await ordenesService.removeOrden(req.params.id);
    if (deleted) {
      res.json({ message: 'Orden eliminada' });
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  } catch (err) {
    next(err);
  }
};


// ...existing code...
