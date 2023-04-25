const express = require("express");
const router = express.Router({ mergeParams: true });

class EventRouter {
  constructor(controller, authenticateToken) {
    this.controller = controller;
    this.authenticateToken = authenticateToken;
  }
  routes() {
    router.get("/", this.authenticateToken, this.controller.getPetEvents);
    router.post("/", this.authenticateToken, this.controller.addEvent);
    router.put("/:eventId", this.authenticateToken, this.controller.editEvent);

    router.get("/categories", this.controller.getCategories);
    router.get(
      "/categories/:categoryId/subcategories",
      this.controller.getSubcategories
    );
    router.post(
      "/categories/:categoryId/subcategories",
      this.controller.addSubcategory
    );
    return router;
  }
}

module.exports = EventRouter;
