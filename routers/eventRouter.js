const express = require("express");
const router = express.Router({ mergeParams: true });

class EventRouter {
  constructor(controller, authenticateToken) {
    this.controller = controller;
    this.authenticateToken = authenticateToken;
  }
  routes() {
    router.get("/", this.authenticateToken, this.controller.getPetEvents);
    router.get(
      "/:eventId",
      this.authenticateToken,
      this.controller.getOneEvent
    );
    router.post("/", this.authenticateToken, this.controller.addEvent);
    router.put("/:eventId", this.authenticateToken, this.controller.editEvent);
    return router;
  }
}

module.exports = EventRouter;
