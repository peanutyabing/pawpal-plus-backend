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
