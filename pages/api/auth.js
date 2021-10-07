import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../utils/db";
import User from "../../lib/User";
import { isAuthenticated } from "../../utils/auth";

db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    jwt.verify(req.body.token, process.env.SECRET, (err, user) => {
      if (user) {
        // get user
        User.findOne({ email: user.email }, (err, user) => {
          if (user) {
            return res.status(200).json({ success: true, user });
          } else {
            return res.status(400).json({ success: false });
          }
        });
      } else {
        return res.status(401).json({ success: false });
      }
    });
  } else {
    res.status(404).end();
  }
}
