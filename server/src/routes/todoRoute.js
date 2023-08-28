import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";
import { restrict } from "../middleware/accessMiddleware.js";
const router = express.Router();

router.post("/create", createTodo);
router.get("/tasks", getTodo);
router.get("/admin", restrict("admin"), getTodos);
router.patch("/:id", updateTodo);
router.delete("/:id", restrict("admin"), deleteTodo);

export default router;
