require("dotenv").config();
const jwt = require("jsonwebtoken");

class UserController {
  constructor(model) {
    this.model = model;
  }

  getUserProfile = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    try {
      const currentUser = await this.model.findOne({
        where: { id: userId },
        attributes: { exclude: ["password", "refresh_token"] },
      });
      return res.json(currentUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = UserController;
