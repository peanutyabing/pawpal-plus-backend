const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller, authenticateToken) {
    this.controller = controller;
    this.authenticateToken = authenticateToken;
  }
  routes() {
    // Auth
    router.post("/sign-up", this.controller.signUp);
    router.post("/sign-in", this.controller.signIn);

    // User profile
    router.get(
      "/:userId",
      this.authenticateToken,
      this.controller.getUserProfile
    );

    return router;
  }
}

module.exports = UserRouter;
