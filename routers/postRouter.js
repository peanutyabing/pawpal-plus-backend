const express = require("express");
const router = express.Router({ mergeParams: true });

class PostRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getPosts);

    return router;
  }
}

module.exports = PostRouter;
