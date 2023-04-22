const express = require("express");
const router = express.Router();

class ReminderRouter {
  constructor(controller, authenticateToken) {
    this.controller = controller;
    this.authenticateToken = authenticateToken;
  }
  routes() {
    router.get("/", this.authenticateToken, this.controller.getReminders);
    return router;
  }
}

module.exports = ReminderRouter;
