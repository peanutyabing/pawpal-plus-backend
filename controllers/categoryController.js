class CategoryController {
  constructor(model, subcategoriesModel) {
    this.model = model;
    this.subcategoriesModel = subcategoriesModel;
  }

  getCategories = async (req, res) => {
    try {
      const categories = await this.model.findAll();
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

module.exports = CategoryController;
