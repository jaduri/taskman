import db from '../../utils/db'
import Task from '../../lib/Task'

db();

export default function handler(req, res) {

  switch (req.method) {
    case 'GET':
      // send all tasks
      Task.find({done: false}, (err, tasks) => {
        if (!err) {
          return res.status(200).json(tasks);
        }
      })
      break;
    case 'POST':
      // add a task and update local
      const newTask = new Task({
        ...req.body
      });

      newTask.save((err, task) => {
        if (!err) {
          return res.status(201).json(task);
        }
      })
      break;
    case 'PATCH':
      // update a task and update local
      Task.updateOne({ _id: req.query.id }, req.body, (err, result) => {
        res.status(200).json(result);
      });
      break;
    case 'DELETE':
      // delete a task and update local
      Task.deleteOne({ _id: req.query.id }, (err, result) => {
        return res.status(200).json(result);
      });
      break;
    default:
      // not found
      return res.status(404).json({message: "404 Not Found"});
  }
}
