const express = require("express");
const router = express.Router({ mergeParams: true });

class AnalyticsRouter {
  constructor(controller, authenticateToken) {
    this.controller = controller;
    this.authenticateToken = authenticateToken;
  }
  routes() {
    router.get(
      "/events-by-category",
      this.authenticateToken,
      this.controller.getEventsByCategory
    );
    router.get(
      "/events-by-subcategory",
      this.authenticateToken,
      this.controller.getEventsBySubcategory
    );
    return router;
  }
}

module.exports = AnalyticsRouter;
