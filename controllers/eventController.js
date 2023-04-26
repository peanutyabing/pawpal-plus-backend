const getUserIdFromToken = require("../utils/auth-helper.js");

class EventController {
  constructor(model, categoriesModel, subcategoriesModel, petsModel) {
    this.model = model;
    this.categoriesModel = categoriesModel;
    this.subcategoriesModel = subcategoriesModel;
    this.petsModel = petsModel;
  }

  getPetEvents = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const { petId } = req.params;
    try {
      await this.petsModel.findOne({
        where: { id: petId, userId },
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: "Pet not found" });
    }
    try {
      const events = await this.model.findAll({
        where: { petId },
        include: [
          {
            model: this.categoriesModel,
            attributes: ["name"],
          },
          {
            model: this.subcategoriesModel,
            attributes: ["name"],
          },
        ],
        order: [["startTime", "DESC"]],
      });
      return res.json(events);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOneEvent = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const { petId, eventId } = req.params;
    try {
      await this.petsModel.findOne({
        where: { id: petId, userId },
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: "Pet not found" });
    }
    try {
      const event = await this.model.findOne({
        where: { id: eventId, petId },
        include: [
          {
            model: this.categoriesModel,
            attributes: ["name"],
          },
          {
            model: this.subcategoriesModel,
            attributes: ["name"],
          },
          {
            model: this.petsModel,
            attributes: ["name", "imageUrl"],
          },
        ],
      });
      return res.json(event);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addEvent = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const { petId } = req.params;
    try {
      await this.petsModel.findOne({
        where: { id: petId, userId },
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: "Pet not found" });
    }
    const {
      categoryId,
      subcategoryId,
      startTime,
      endTime,
      causeForConcern,
      description,
      data,
      unit,
      imageUrl,
      remindMe,
    } = req.body;
    console.log(req.body);

    await this.updatePreviousLatest(petId, subcategoryId);

    try {
      await this.model.create({
        petId,
        categoryId,
        subcategoryId,
        startTime,
        endTime,
        causeForConcern,
        description,
        data: Number(data),
        unit,
        imageUrl,
        remindMe,
        latest: true, // A new event is always the latest of its subcategory for that pet
      });

      const events = await this.model.findAll({
        where: { petId: petId },
        order: [["startTime", "DESC"]],
      });
      return res.json(events);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updatePreviousLatest = async (petId, subcategoryId) => {
    try {
      await this.model.update(
        { latest: false, updatedAt: new Date() },
        {
          where: {
            latest: true,
            petId,
            subcategoryId,
          },
        }
      );
    } catch (err) {
      return err;
    }
  };

  editEvent = async (req, res) => {
    const userId = getUserIdFromToken(req);
    const { petId, eventId } = req.params;
    try {
      await this.petsModel.findOne({
        where: { id: petId, userId },
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: "Pet not found" });
    }
    const {
      categoryId,
      subcategoryId,
      startTime,
      endTime,
      causeForConcern,
      description,
      data,
      unit,
      imageUrl,
      remindMe,
    } = req.body;
    try {
      await this.model.update(
        {
          categoryId,
          subcategoryId,
          startTime,
          endTime,
          causeForConcern,
          description,
          data,
          unit,
          imageUrl,
          remindMe,
          updatedAt: new Date(),
        },
        {
          where: { id: eventId },
        }
      );
      const events = await this.model.findAll({
        where: { petId: petId },
        order: [["startTime", "DESC"]],
      });
      return res.json(events);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = EventController;
