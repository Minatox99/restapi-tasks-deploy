import Task from "../models/Task.js";
import { getPagination } from "../libs/getPagination.js";

export const findAllTasks = async (req, res) => {
  try {
    const { page, size, title } = req.query;

    const condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};

    const { limit, offset } = getPagination(page, size);
    const data = await Task.paginate(condition, { offset, limit });

    res.json({
      totalItems: data.totalDocs,
      tasks: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};

export const createTask = async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    done: req.body.done ? req.body.done : false,
  });
  const taskSaved = await newTask.save();
  res.json(taskSaved);
};

export const findOneTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({
    message: "Task were deleted successfully",
  });
};

export const findAllDoneTasks = async (req, res) => {
  const tasks = await Task.find({ done: true });
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Task was updated Succesfully" });
};
