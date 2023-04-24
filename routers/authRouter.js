const express = require("express");
const router = express.Router();

class AuthRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.post("/sign-up", this.controller.signUp);
    router.post("/sign-in", this.controller.signIn);
    router.get("/sign-out", this.controller.signOut);
    router.get("/refresh", this.controller.refreshToken);
    return router;
  }
}

module.exports = AuthRouter;
