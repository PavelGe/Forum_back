const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      console.log("USER VERIFIED");
      req.userId = decoded.userId;
      console.log(req.userId);
      next();
    } else {
      console.log(err);
      console.log("Middleware failed");
      return res.status(401).json({ tasks: "Middleware failed" });
    }
  });
};
