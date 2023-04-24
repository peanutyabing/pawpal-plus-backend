const express = require("express");
const router = express.Router();

class AuthRouter {
  constructor(controller, authenticateToken) {
    this.controller = controller;
    this.authenticateToken = authenticateToken;
  }
  routes() {
    router.post("/sign-up", this.controller.signUp);
    router.post("/sign-in", this.controller.signIn);
    router.get("/sign-out", this.controller.signOut);
    router.get("/refresh", this.controller.refreshToken);
    router.put(
      "/change-password",
      this.authenticateToken,
      this.controller.changePassword
    );
    return router;
  }
}

module.exports = AuthRouter;
