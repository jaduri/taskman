import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Legend",
  },
  email: {
    type: String,
  },
  passwordHash: {
    type: String,
    default: "none",
  },
  status: String,
  columns: {
    type: Array,
    default: ["Today", "Work", "Uni", "Chores", "Wellness"],
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
