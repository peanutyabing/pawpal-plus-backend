const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller, authenticateToken) {
    this.controller = controller;
    this.authenticateToken = authenticateToken;
  }
  routes() {
    router.get("/", this.authenticateToken, this.controller.getUserProfile);
    router.post("/check-if-exist", this.controller.checkIfUserExists);

    return router;
  }
}

module.exports = UserRouter;
