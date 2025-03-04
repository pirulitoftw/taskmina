const Task = require('../models/Task');
const moment = require('moment');

const createTask = async ({ title, description, dueDate, priority, userId }) => {
  const task = new Task({ title, description, dueDate, priority, userId });
  await task.save();
  return task;
};

const updateTask = async ({ id, title, description, completed, dueDate, priority, userId }) => {
  const task = await Task.findOneAndUpdate(
    { _id: id, userId },
    { title, description, completed, dueDate, priority },
    { new: true }
  );
  return task;
};

const deleteTask = async ({ id, userId }) => {
  await Task.findOneAndDelete({ _id: id, userId });
};

const getTasks = async ({ userId }) => {
  const tasks = await Task.find({ userId });
  return tasks;
};

const getTaskById = async ({ id, userId }) => {
  const task = await Task.findOne({ _id: id, userId });
  return task;
};

const completeTask = async ({ id, userId }) => {
  const task = await Task.findOneAndUpdate(
    { _id: id, userId },
    { completed: true },
    { new: true }
  );
  return task;
};

const incompleteTask = async ({ id, userId }) => {
  const task = await Task.findOneAndUpdate(
    { _id: id, userId },
    { completed: false },
    { new: true }
  );
  return task;
};

const getTasksByPriority = async ({ priority, userId }) => {
  const tasks = await Task.find({ priority, userId });
  return tasks;
};

const getTasksByDueDate = async ({ date, userId }) => {
  const tasks = await Task.find({ dueDate: date, userId });
  return tasks;
};

const getTaskStats = async ({ userId }) => {
  const total = await Task.countDocuments({ userId });
  const completed = await Task.countDocuments({ userId, completed: true });
  const pending = total - completed;
  const urgent = await Task.countDocuments({
    userId,
    priority: 'high',
    completed: false,
    dueDate: { $lte: moment().add(3, 'days').toDate() }
  });
  const overdueCount = await Task.countDocuments({
    userId,
    completed: false,
    dueDate: { $lt: new Date() }
  });

  return {
    total,
    completed,
    pending,
    urgent,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    overdueCount
  };
};

const getUrgentTasks = async ({ userId }) => {
  const tasks = await Task.find({
    userId,
    priority: 'high',
    completed: false,
    dueDate: { $lte: moment().add(3, 'days').toDate() }
  }).sort({ dueDate: 1 });

  const tasksWithTimeRemaining = tasks.map(task => {
    const taskObj = task.toObject();
    const dueDate = moment(task.dueDate);
    const now = moment();
    const days = dueDate.diff(now, 'days');
    taskObj.timeRemaining = days > 0 ? `${days} días` : 'Vencida';
    return taskObj;
  });

  return {
    tasks: tasksWithTimeRemaining,
    count: tasks.length
  };
};

const getPrioritySummary = async ({ userId }) => {
  const priorities = ['high', 'medium', 'low'];
  const summary = {};

  for (const priority of priorities) {
    const total = await Task.countDocuments({ userId, priority });
    const completed = await Task.countDocuments({ userId, priority, completed: true });
    summary[priority] = {
      total,
      completed,
      pending: total - completed
    };
  }

  return summary;
};

const getWeeklyProgress = async ({ userId }) => {
  const startOfWeek = moment().startOf('week');
  const dailyProgress = [];

  const weeklyTasks = await Task.find({
    userId,
    createdAt: { $gte: startOfWeek.toDate() }
  });

  const weeklyCompleted = weeklyTasks.filter(task => task.completed).length;
  const totalCreated = weeklyTasks.length;

  for (let i = 0; i < 7; i++) {
    const date = moment(startOfWeek).add(i, 'days').format('YYYY-MM-DD');
    const dayStart = moment(date).startOf('day');
    const dayEnd = moment(date).endOf('day');

    const dayCreated = weeklyTasks.filter(task => 
      moment(task.createdAt).isBetween(dayStart, dayEnd)
    ).length;

    const dayCompleted = weeklyTasks.filter(task => 
      task.completed && moment(task.updatedAt).isBetween(dayStart, dayEnd)
    ).length;

    dailyProgress.push({
      date,
      created: dayCreated,
      completed: dayCompleted
    });
  }

  return {
    weeklyStats: {
      totalCreated,
      completed: weeklyCompleted,
      completionRate: totalCreated > 0 ? Math.round((weeklyCompleted / totalCreated) * 100) : 0,
      dailyProgress
    }
  };
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