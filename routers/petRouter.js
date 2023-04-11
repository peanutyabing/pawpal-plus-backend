const express = require("express");
const router = express.Router();

class PetRouter {
  constructor(controller) {
    this.controller = controller;
  }
  // /users/:userId/pets
  routes() {
    // profile-related requests
    router.get("/", this.controller.getAllPets);
    router.get("/users/:userId", this.controller.getMyPets);
    router.get("/:petId", this.controller.getOnePet);
    // router.post("/", this.controller.addPet);
    // router.put("/:petId", this.controller.updatePet);

    // event-related requests
    // router.get("/:petId/events", this.controller.getPetEvents);
    // router.get("/:petId/events/:eventId", this.controller.getOneEvent);
    // router.post("/:petId/events", this.controller.addEvent);
    // router.put("/:petId/events/:eventId", this.controller.updateEvent);
    return router;
  }
}

module.exports = PetRouter;
