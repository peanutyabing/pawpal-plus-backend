const express = require("express");
const router = express.Router({ mergeParams: true });

class PetRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // Pet categorization
    router.get("/species", this.controller.getSpecies);
    router.get("/species/:speciesId/breeds", this.controller.getSpeciesBreeds);

    // Pet profiles
    router.get("/", this.controller.getMyPets);
    router.get("/:petId", this.controller.getOnePet);
    router.post("/", this.controller.addPet);
    router.put("/:petId", this.controller.updatePet);

    // Pet events
    router.get("/:petId/events", this.controller.getPetEvents);
    router.post("/:petId/events", this.controller.addEvent);
    router.put("/:petId/events/:eventId", this.controller.editEvent);
    return router;
  }
}

module.exports = PetRouter;
