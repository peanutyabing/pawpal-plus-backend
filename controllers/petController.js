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
    const { userId } = req.params;
    try {
      const pets = await this.model.findAll({
        where: { userId: userId },
        order: [["species_id"]],
      });
      return res.json(pets);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOnePet = async (req, res) => {
    const { petId } = req.params;
    try {
      const pet = await this.model.findByPk(petId, {
        include: {
          model: this.eventsModel,
        },
        order: [[{ model: this.eventsModel }, "startTime", "DESC"]],
      });
      return res.json(pet);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addPet = async (req, res) => {
    const { userId } = req.params;
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
        where: { userId: userId },
        order: [["species_id"]],
      });
      return res.json(pets);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updatePet = async (req, res) => {
    const { userId, petId } = req.params;
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
        where: { userId: userId },
        order: [["species_id"]],
      });
      return res.json(pets);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Pet events
  getPetEvents = async (req, res) => {
    const { petId } = req.params;
    console.log("params", req.params);
    try {
      const events = await this.eventsModel.findAll({
        where: { petId: petId },
        order: [["startTime", "DESC"]],
      });
      return res.json(events);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addEvent = async (req, res) => {
    const { petId } = req.params;
    const {
      name,
      startTime,
      endTime,
      description,
      imageUrl,
      locationDetails,
      remindMe,
    } = req.body;
    try {
      await this.eventsModel.create({
        petId,
        name,
        startTime,
        endTime,
        description,
        imageUrl,
        locationDetails,
        remindMe,
      });
      const events = await this.eventsModel.findAll({
        where: { petId: petId },
        order: [["startTime", "DESC"]],
      });
      return res.json(events);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  editEvent = async (req, res) => {
    const { petId, eventId } = req.params;
    const {
      name,
      startTime,
      endTime,
      description,
      imageUrl,
      locationDetails,
      remindMe,
    } = req.body;
    try {
      await this.eventsModel.update(
        {
          name,
          startTime,
          endTime,
          description,
          imageUrl,
          locationDetails,
          remindMe,
          updatedAt: new Date(),
        },
        {
          where: { id: eventId },
        }
      );
      const events = await this.eventsModel.findAll({
        where: { petId: petId },
        order: [["startTime", "DESC"]],
      });
      return res.json(events);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = PetController;
