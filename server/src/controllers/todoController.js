import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import Todo from "../models/todoModel.js";

// @desc    create user specific ToDo
// @route   POST api/todo/create
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
  const { title, description, dueDate, precedence, finished } = req.body;

  const user = req.user;

  if (!title || !description || !dueDate || !precedence) {
    throw createHttpError(400, "Please fill all fields");
  }

  const todo = await Todo.create({
    user: user._id,
    title,
    description,
    dueDate,
    precedence,
  });
  res.status(201).json(todo);
});

// @desc    get user todo
// @route   GET api/todo/todos
// @access  Private - user role
const getTodo = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const tasks = await Todo.find({ user }).sort({ _id: -1 }).lean().exec();
  res.status(200).json(tasks);
});

// @desc    get all todos
// @route   GET api/todo/admin
// @access  Private - admin role
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find().exec();
  res.status(200).json(todos);
});

// @desc    updatet user todo
// @route   PATCH api/todo/update/id
// @access  Private - user role
const updateTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, description, dueDate, precedence, newFinished } = req.body;

  if (!title || !description || !dueDate || !precedence) {
    throw createHttpError(400, "please fill all necessary fields");
  }

  const todo = await Todo.findById({ id: id }).exec();

  if (!todo) {
    throw createHttpError(404, "Invalid todo details");
  }
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.precedence = precedence;

  const updatedTodo = await todo.save();
  res.status(200).json(updatedTodo);
});

// @desc    get user todo
// @route   DELETE api/todo/delete/id
// @access  Private - admin role
const deleteTodo = async (req, res) => {
  const id = req.params.id;

  const todo = await Todo.findById({ _id: id }).exec();

  if (!todo) {
    throw createHttpError(404, "This item does not exist in the server.");
  }

  await todo.deleteOne();

  res.sendStatus(204);
};

export { createTodo, deleteTodo, getTodo, getTodos, updateTodo };
