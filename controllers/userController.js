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

  updateUserProfile = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const { imageUrl, country, region, cityTown } = req.body;
    try {
      const updatedProfileRes = await this.model.update(
        {
          imageUrl,
          country,
          region,
          cityTown,
          updatedAt: new Date(),
        },
        {
          where: { id: userId },
        }
      );
      res.json(updatedProfileRes);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  checkIfUserExists = async (req, res) => {
    const attribute = Object.keys(req.body)[0];
    try {
      const foundUser = await this.model.findOne({
        where: { [attribute]: req.body[attribute] },
      });
      if (foundUser) {
        return res.json({ userFound: true });
      } else {
        return res.json({ userFound: false });
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = UserController;
