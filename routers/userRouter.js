const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // Auth
    router.post("/sign-up", this.controller.signUp);
    router.post("/sign-in", this.controller.signIn);

    // User profile
    // router.get("/:userId", this.controller.getUserProfile);

    return router;
  }
}

module.exports = UserRouter;
