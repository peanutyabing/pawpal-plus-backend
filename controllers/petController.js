const getUserIdFromToken = require("../utils/auth-helper.js");

class PetController {
  constructor(model, eventsModel, speciesModel, breedsModel) {
    this.model = model;
    this.eventsModel = eventsModel;
    this.speciesModel = speciesModel;
    this.breedsModel = breedsModel;
  }

  // Pet categorization
  getSpecies = async (req, res) => {
    try {
      const species = await this.speciesModel.findAll({
        order: [["name"]],
      });
      return res.json(species);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getSpeciesBreeds = async (req, res) => {
    const { speciesId } = req.params;
    try {
      const oneSpecies = await this.speciesModel.findByPk(speciesId);
      const oneSpeciesBreeds = await oneSpecies.getBreeds();
      return res.json(oneSpeciesBreeds);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Pet profiles
  getMyPets = async (req, res) => {
    const userId = getUserIdFromToken(req);
    try {
      const pets = await this.model.findAll({
        where: { userId },
        include: [
          {
            model: this.speciesModel,
            attributes: ["name"],
          },
          {
            model: this.breedsModel,
            attributes: ["name"],
          },
        ],
        order: [["created_at", "DESC"]],
      });
      return res.json(pets);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOnePet = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const { petId } = req.params;
    try {
      const pet = await this.model.findAll({
        where: { userId, id: petId },
        include: [
          {
            model: this.speciesModel,
            attributes: ["name"],
          },
          {
            model: this.breedsModel,
            attributes: ["name"],
          },
          { model: this.eventsModel },
        ],
        order: [[{ model: this.eventsModel }, "startTime", "DESC"]],
      });
      return res.json(pet);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addPet = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const { speciesId, breedId, name, imageUrl, dateOfBirth } = req.body;
    try {
      await this.model.create({
        userId,
        speciesId,
        breedId,
        name,
        imageUrl,
        dateOfBirth,
      });
      const pets = await this.model.findAll({
        where: { userId },
        order: [["species_id"]],
      });
      return res.json(pets);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updatePet = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const { petId } = req.params;
    const { speciesId, breedId, name, imageUrl, dateOfBirth } = req.body;
    try {
      await this.model.update(
        {
          speciesId,
          breedId,
          name,
          imageUrl,
          dateOfBirth,
          updatedAt: new Date(),
        },
        {
          where: { id: petId },
        }
      );
      const pets = await this.model.findAll({
        where: { userId },
        order: [["species_id"]],
      });
      return res.json(pets);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = PetController;
