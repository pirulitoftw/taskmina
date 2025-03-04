const Task = require('../models/Task');

const authorizeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
    }
    if (task.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'No tienes permiso para realizar esta acción' });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = authorizeTask;