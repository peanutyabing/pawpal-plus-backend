const express = require("express");
const router = express.Router({ mergeParams: true });

class ReminderRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getReminders);
    return router;
  }
}

module.exports = ReminderRouter;
