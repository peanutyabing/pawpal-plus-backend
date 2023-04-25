require("dotenv").config();
const jwt = require("jsonwebtoken");

const getUserIdFromToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

module.exports = getUserIdFromToken;
