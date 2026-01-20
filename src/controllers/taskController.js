const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
  const tasks = await Task.find(query);
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = new Task({ ...req.body, userId: req.user.id });
  await task.save();
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || (req.user.role !== 'admin' && task.userId.toString() !== req.user.id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || (req.user.role !== 'admin' && task.userId.toString() !== req.user.id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  await task.remove();
  res.json({ message: 'Task deleted' });
};