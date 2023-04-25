require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const getUserIdFromToken = require("../utils/auth-helper.js");

class AuthController {
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
    const token = this.generateToken(payload);
    const refreshToken = this.generateToken(payload, true);
    this.saveToken(refreshToken, newUser.id);
    res.cookie("jwt", refreshToken, {
      sameSite: "None",
      secure: true,
    });
    return res.json({ success: true, token, id: newUser.id });
  };

  signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return res
        .status(403)
        .json({ success: false, msg: "incorrect user email" });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res
        .status(403)
        .json({ success: false, msg: "incorrect password" });
    }

    const payload = { id: user.id, username: user.username };
    const token = this.generateToken(payload);
    const refreshToken = this.generateToken(payload, true);
    this.saveToken(refreshToken, user.id);
    res.cookie("jwt", refreshToken, {
      sameSite: "None",
      secure: true,
    });
    return res.json({
      success: true,
      msg: "user authenticated",
      token,
      id: user.id,
    });
  };

  refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    const foundUser = await this.model.findOne({ where: { refreshToken } });
    if (!foundUser) {
      return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, (err, user) => {
      if (err || user.username !== foundUser.username) {
        return res
          .status(403)
          .json({ success: false, msg: "invalid refresh token" });
      }
      const payload = { id: user.id, username: user.username };
      const token = this.generateToken(payload);
      res.json({ success: true, msg: "token refreshed", token, id: user.id });
    });
  };

  generateToken = (payload, refresh = false) => {
    if (refresh) {
      return jwt.sign(payload, process.env.REFRESH_JWT_SECRET, {
        expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
      });
    } else {
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    }
  };

  saveToken = async (token, userId) => {
    try {
      await this.model.update(
        { refreshToken: token },
        { where: { id: userId } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  signOut = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(204); // Successful req, nothing to send back
    }
    const refreshToken = cookies.jwt;
    const foundUser = await this.model.findOne({ where: { refreshToken } });
    if (!foundUser) {
      res.clearCookie("jwt", {
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }
    try {
      await foundUser.update({ refreshToken: "" });
      res.clearCookie("jwt", {
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    } catch (err) {
      return res
        .status(403)
        .json({ success: false, msg: "failed to erase token" });
    }
  };

  changePassword = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
      const updatePasswordRes = await this.model.update(
        {
          password: hashedPassword,
          updatedAt: new Date(),
        },
        { where: { id: userId } }
      );
      res.json(updatePasswordRes);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = AuthController;
