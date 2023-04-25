const express = require("express");
const router = express.Router();

class CategoryRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getCategories);
    router.get("/:categoryId/subcategories", this.controller.getSubcategories);
    router.post("/:categoryId/subcategories", this.controller.addSubcategory);
    return router;
  }
}

module.exports = CategoryRouter;
