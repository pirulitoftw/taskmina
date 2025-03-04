const { createTask: createTaskService, updateTask: updateTaskService, deleteTask: deleteTaskService, getTasks: getTasksService, getTaskById: getTaskByIdService, completeTask: completeTaskService, incompleteTask: incompleteTaskService, getTasksByPriority: getTasksByPriorityService, getTasksByDueDate: getTasksByDueDateService, getTaskStats: getTaskStatsService, getUrgentTasks: getUrgentTasksService, getPrioritySummary: getPrioritySummaryService, getWeeklyProgress: getWeeklyProgressService } = require('../services/TaskService');

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const { userId } = req.user;
    const task = await createTaskService({ title, description, dueDate, priority, userId });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, dueDate, priority } = req.body;
    const { userId } = req.user;
    const task = await updateTaskService({ id, title, description, completed, dueDate, priority, userId });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    await deleteTaskService({ id, userId });
    res.status(200).json({ success: true, message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const tasks = await getTasksService({ userId });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const task = await getTaskByIdService({ id, userId });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const task = await completeTaskService({ id, userId });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const incompleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const task = await incompleteTaskService({ id, userId });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.params;
    const { userId } = req.user;
    const tasks = await getTasksByPriorityService({ priority, userId });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTasksByDueDate = async (req, res) => {
  try {
    const { date } = req.params;
    const { userId } = req.user;
    const tasks = await getTasksByDueDateService({ date, userId });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTaskStats = async (req, res) => {
  try {
    const { userId } = req.user;
    const stats = await getTaskStatsService({ userId });
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUrgentTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const tasks = await getUrgentTasksService({ userId });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPrioritySummary = async (req, res) => {
  try {
    const { userId } = req.user;
    const summary = await getPrioritySummaryService({ userId });
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWeeklyProgress = async (req, res) => {
  try {
    const { userId } = req.user;
    const progress = await getWeeklyProgressService({ userId });
    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { 
  createTask, 
  updateTask, 
  deleteTask, 
  getTasks, 
  getTaskById, 
  completeTask, 
  incompleteTask, 
  getTasksByPriority, 
  getTasksByDueDate,
  getTaskStats,
  getUrgentTasks,
  getPrioritySummary,
  getWeeklyProgress
};