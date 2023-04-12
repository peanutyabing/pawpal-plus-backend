class PetController {
  constructor(model, eventsModel) {
    this.model = model;
    this.eventsModel = eventsModel;
  }

  getMyPets = async (req, res) => {
    const { userId } = req.params;
    console.log("params", req.params);
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
    console.log("params", req.params);
    try {
      const pet = await this.model.findByPk(petId, {
        include: {
          model: this.eventsModel,
          attributes: ["name", "time", "description", "location_details"],
        },
      });
      return res.json(pet);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addPet = async (req, res) => {
    const { userId } = req.params;
    const { speciesId, breedId, name, imageUrl, dateOfBirth } = req.body;
    console.log(userId);
    console.log(speciesId, breedId, name);
    try {
      await this.model.create({
        userId: userId,
        speciesId: speciesId,
        breedId: breedId,
        name: name,
        imageUrl: imageUrl,
        dateOfBirth: dateOfBirth,
      });
      console.log("added pet");
      const pets = await this.model.findAll({
        where: { userId: userId },
        order: [["species_id"]],
      });
      console.log("getting pets");
      return res.json(pets);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = PetController;
