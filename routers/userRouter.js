const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller, authenticateToken) {
    this.controller = controller;
    this.authenticateToken = authenticateToken;
  }
  routes() {
    router.get(
      "/:userId",
      this.authenticateToken,
      this.controller.getUserProfile
    );

    return router;
  }
}

module.exports = UserRouter;
