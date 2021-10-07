import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../utils/db";
import User from "../../lib/User";
import { isAuthenticated } from "../../utils/auth";

db();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    if (!(await isAuthenticated(req, res))) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  }

  switch (req.method) {
    case "GET":
      // get user
      User.findOne({ email: "req.user.email" }, (err, user) => {
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(400).json({ success: false });
        }
      });
      break;
    case "POST":
      bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (hash) {
            // add a task and update local
            const newUser = new User({
              ...req.body,
              passwordHash: hash,
            });

            newUser.save((err, user) => {
              if (user) {
                let payload = {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  columns: user.columns,
                  emailConfirmed: user.emailConfirmed,
                };

                jwt.sign(payload, process.env.SECRET, function (err, token) {
                  if (token) {
                    return res
                      .status(200)
                      .json({ success: true, user: payload, token });
                  } else {
                    return res.status(401).json({ success: false, error: err });
                  }
                });
              }
            });
          } else {
            return res.status(400).json({ success: false });
          }
        });
      });

      break;
    case "PATCH":
      // update a task and update local
      User.updateOne({ _id: req.user.id }, req.body, (err, result) => {
        if (result) {
          return res.status(200).json(result);
        } else {
          return res.status(400).json({ success: false });
        }
      });
      break;
    case "DELETE":
      // delete a task and update local
      Task.deleteOne({ _id: req.user.id }, (err, result) => {
        return res.status(200).json(result);
      });
      break;
    default:
      // not found
      return res.status(404).json({ message: "404 Not Found" });
  }
}
