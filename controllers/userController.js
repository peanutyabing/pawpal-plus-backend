require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

class UserController {
  constructor(model) {
    this.model = model;
  }

  // Auth
  signUp = async (req, res) => {
    const { username, email, password, imageUrl, country, region, cityTown } =
      req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing username, email, or password" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await this.model.create({
      username,
      email,
      password: hashedPassword,
      imageUrl,
      country,
      region,
      cityTown,
    });

    const payload = { id: newUser.id, username };
    const token = this.generateToken(payload);
    return res.json({ success: true, token });
  };

  signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await this.model.findOne({ where: { email } });
    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res
        .status(403)
        .json({ success: false, msg: "incorrect password" });
    }

    const payload = { id: user.id, username: user.username };
    const token = this.generateToken(payload);
    return res.json({
      success: true,
      msg: "user authenticated",
      token,
    });
  };

  generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  // User profiles
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
