import jwt from "jsonwebtoken";

export function isAuthenticated(req, res) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Accept, Content-Length, Content-Type, token"
  );

  return new Promise((resolve, reject) => {
    jwt.verify(req.headers.token, process.env.SECRET, (err, user) => {
      if (user) {
        req.user = user;
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}
