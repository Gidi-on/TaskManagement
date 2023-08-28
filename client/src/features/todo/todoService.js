import axios from "axios";

const API_URL = "http://localhost:5000/api/todo/";

//get user todo
const getUserTodo = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const response = await axios.get(API_URL + "tasks", config);
  return response.data;
};

//get all todos - admin
const getAllTodo = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const response = await axios.get(API_URL + "admin", config);
  return response.data;
};

//create user todo
const createTodo = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const response = await axios.post(API_URL + "create", userData, config);
  return response.data;
};

//update user todo
const updateTodo = async (todo) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const { title, description, dueDate, precedence } = todo;
  const body = JSON.stringify({
    title: title,
    description: description,
    dueDate: dueDate,
    precedence: precedence,
  });

  const response = await axios.patch(API_URL + todo._id, body, config);
  return response.data;
};

//delete todo - admin
const deleteTodo = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const response = await axios.post(API_URL + id, config);
  return response.data;
};

const userService = {
  getUserTodo,
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default userService;
