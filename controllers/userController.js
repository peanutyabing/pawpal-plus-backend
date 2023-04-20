require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

class UserController {
  constructor(model) {
    this.model = model;
  }

  signUp = async (req, res) => {
    const { username, email, password } = req.body;
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
    });

    const payload = { id: newUser.id, username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

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
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.json({ success: true, msg: "user authenticated", token });
  };
}

module.exports = UserController;
