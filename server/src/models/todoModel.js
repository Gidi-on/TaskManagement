import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  precedence: {
    enum: ["Low", "Medium", "High"],
    type: String,
    required: true,
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
