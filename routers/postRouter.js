const express = require("express");
const router = express.Router({ mergeParams: true });

class PostRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAllPosts);
    router.get("/postId/:postId", this.controller.getSinglePost);

    router.get("/postId/:postId/comments", this.controller.getComments);

    router.get("/topics/postId/:postId", this.controller.getAllTopicsOfPost);
    router.get("/topics/all", this.controller.getAllTopicName);

    router.get("/topics/:topicId", this.controller.getTopicName);

    router.post("/", this.controller.addNewPost);
    router.post("/:postId/addComments", this.controller.addComment);

    return router;
  }
}

module.exports = PostRouter;
