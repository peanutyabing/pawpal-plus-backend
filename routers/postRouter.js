const express = require("express");
const router = express.Router({ mergeParams: true });

class PostRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAllPosts);
    router.get("/:postId", this.controller.getSinglePost);

    router.get("/:postId/comments", this.controller.getComments);

    router.post("/:postId/addComments", this.controller.addComment);

    router.post("/newPost", this.controller.addNewPost);

    return router;
  }
}

module.exports = PostRouter;
