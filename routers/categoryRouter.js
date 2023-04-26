const express = require("express");
const router = express.Router();

class CategoryRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/categories", this.controller.getCategories);
    router.get("/subcategories", this.controller.getAllSubcategories);
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

module.exports = CategoryRouter;
