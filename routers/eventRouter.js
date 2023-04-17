const express = require("express");
const router = express.Router({ mergeParams: true });

class EventRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getPetEvents);
    router.post("/", this.controller.addEvent);
    router.put("/:eventId", this.controller.editEvent);
    return router;
  }
}

module.exports = EventRouter;
