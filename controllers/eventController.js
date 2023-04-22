const getUserIdFromToken = require("../utils/auth-helper.js");

class EventController {
  constructor(model, categoriesModel, subcategoriesModel, petsModel) {
    this.model = model;
    this.categoriesModel = categoriesModel;
    this.subcategoriesModel = subcategoriesModel;
    this.petsModel = petsModel;
  }

  // Event content
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
        data,
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

  // Event categorization
  getCategories = async (req, res) => {
    try {
      const categories = await this.categoriesModel.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getSubcategories = async (req, res) => {
    const { categoryId } = req.params;
    try {
      const subcategories = await this.subcategoriesModel.findAll({
        where: { categoryId },
      });
      return res.json(subcategories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addSubcategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    try {
      const newSubcategory = await this.subcategoriesModel.create({
        categoryId,
        name,
      });
      return res.json(newSubcategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = EventController;
