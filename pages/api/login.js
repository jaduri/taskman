import db from "../../utils/db";
import User from "../../lib/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

db();

export default function handler(req, res) {
  if (req.method === "POST") {
    const user = User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        let payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          columns: user.columns,
          emailConfirmed: user.emailConfirmed,
        };

        bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {
          if (result) {
            jwt.sign(payload, process.env.SECRET, function (err, token) {
              if (token) {
                return res
                  .status(200)
                  .json({ success: true, user: payload, token: token });
              } else {
                return res.status(401).json({ success: false, error: err });
              }
            });
          } else {
            return res.status(401).json({ success: false, error: err });
          }
        });
      } else {
        return res.status(401).json({ success: false, error: err });
      }
    });
  } else {
    res.status(404).end();
  }
}
