const router = require('express').Router()
const { 
    userController,
    taskController
} = require('../api/controllers')
const authMiddleware = require('../api/middlewares/authMiddleware');
const authorizeTask = require('../api/middlewares/authorizationMiddleware');
const { taskValidationRules } = require('../api/validators/taskValidator');
const { validationResult } = require('express-validator');

// Rutas de autenticación

// Rutas de tareas sin parámetros
router.get('/tasks', authMiddleware, taskController.getTasks);
router.post('/tasks', authMiddleware, taskValidationRules(), (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, taskController.createTask);

// Rutas de estadísticas (deben ir antes de las rutas con :id)
router.get('/tasks/stats', authMiddleware, taskController.getTaskStats);
router.get('/tasks/urgent', authMiddleware, taskController.getUrgentTasks);
router.get('/tasks/priority-summary', authMiddleware, taskController.getPrioritySummary);
router.get('/tasks/weekly-progress', authMiddleware, taskController.getWeeklyProgress);

// Rutas de tareas específicas
router.get('/tasks/priority/:priority', authMiddleware, taskController.getTasksByPriority);
router.get('/tasks/due/:date', authMiddleware, taskController.getTasksByDueDate);

// Rutas con ID (deben ir al final)
router.get('/tasks/:id', authMiddleware, authorizeTask, taskController.getTaskById);
router.put('/tasks/:id', authMiddleware, authorizeTask, taskValidationRules(), (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, taskController.updateTask);
router.delete('/tasks/:id', authMiddleware, authorizeTask, taskController.deleteTask);
router.patch('/tasks/:id/complete', authMiddleware, authorizeTask, taskController.completeTask);
router.patch('/tasks/:id/incomplete', authMiddleware, authorizeTask, taskController.incompleteTask);

module.exports = router


