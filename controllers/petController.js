class PetController {
  constructor(model, eventsModel) {
    this.model = model;
    this.eventsModel = eventsModel;
  }

  getAllPets = async (req, res) => {
    try {
      const pets = await this.model.findAll();
      return res.json(pets);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

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
}

module.exports = PetController;
