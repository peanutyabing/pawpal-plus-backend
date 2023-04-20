const express = require("express");
const router = express.Router({ mergeParams: true });

class PostRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getPosts);
    router.get("/:postId", this.controller.getSinglePost);
    return router;
  }
}

module.exports = PostRouter;
