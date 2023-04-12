const express = require("express");
const router = express.Router({ mergeParams: true });

class PetRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getMyPets);
    router.get("/:petId", this.controller.getOnePet);
    router.post("/", this.controller.addPet);
    // router.put("/:petId", this.controller.updatePet);
    return router;
  }
}

module.exports = PetRouter;
