import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  summary: {
    type: String,
    default: "Create a todolist that works for me"
  },
  duration: Number,
  status: String,
  done: Boolean,
  notes: {
    type: String,
    default: "add notes here"
  },
  deadline: {
    type: String,
    default: "none"
  },
  column: {
    type: String,
    default: "column"
  }
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
