import db from "../../utils/db";
import Task from "../../lib/Task";
import { isAuthenticated } from "../../utils/auth";

db();

export default async function handler(req, res) {
  if (!(await isAuthenticated(req, res))) {
    res.status(401).json({ success: false, message: "Not Authorized" });
  }
  switch (req.method) {
    case "GET":
      // send all tasks
      Task.find({ owner_id: req.user.id, done: false }, (err, tasks) => {
        if (!err) {
          return res.status(200).json(tasks);
        } else {
          return res.status(400).json([]);
        }
      });
      break;
    case "POST":
      // add a task and update local
      const newTask = new Task({
        ...req.body,
      });

      newTask.save((err, task) => {
        if (!err) {
          return res.status(201).json(task);
        }
      });
      break;
    case "PATCH":
      console.log("here");
      // update a task and update local
      Task.updateOne({ _id: req.query.id }, req.body, (err, result) => {
        res.status(200).json(result);
      });
      break;
    case "DELETE":
      // delete a task and update local
      Task.deleteOne({ _id: req.query.id }, (err, result) => {
        return res.status(200).json(result);
      });
      break;
    default:
      // not found
      return res.status(404).json({ message: "404 Not Found" });
  }
}
