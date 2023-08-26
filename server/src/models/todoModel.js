import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: String,
  },
  precedence: {
    enum: ["low", "medium", "high"],
    type: String,
  },
  finished: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
