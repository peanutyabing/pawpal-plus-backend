class EventController {
  constructor(model, categoriesModel, subcategoriesModel) {
    this.model = model;
    this.categoriesModel = categoriesModel;
    this.subcategoriesModel = subcategoriesModel;
  }

  // Event content
  getPetEvents = async (req, res) => {
    const { petId } = req.params;
    try {
      const events = await this.model.findAll({
        where: { petId: petId },
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
    const { petId } = req.params;
    console.log(petId);
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
    console.log(categoryId, subcategoryId);
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

  editEvent = async (req, res) => {
    const { petId, eventId } = req.params;
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
