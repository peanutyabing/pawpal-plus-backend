require("dotenv").config();

class UserController {
  constructor(model) {
    this.model = model;
  }

  getUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
      const currentUser = await this.model.findOne({ id: userId });
      res.json(currentUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = UserController;
