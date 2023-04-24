const express = require("express");
const router = express.Router();

class PetRouter {
  constructor(controller, authenticateToken) {
    this.controller = controller;
    this.authenticateToken = authenticateToken;
  }
  routes() {
    // Pet categorization
    router.get("/species", this.controller.getSpecies);
    router.get("/species/:speciesId/breeds", this.controller.getSpeciesBreeds);

    // Pet profiles
    router.get("/", this.authenticateToken, this.controller.getMyPets);
    router.get("/:petId", this.authenticateToken, this.controller.getOnePet);
    router.post("/", this.authenticateToken, this.controller.addPet);
    router.put("/:petId", this.authenticateToken, this.controller.updatePet);

    return router;
  }
}

module.exports = PetRouter;
