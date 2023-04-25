const getUserIdFromToken = require("../utils/auth-helper.js");
const sequelize = require("sequelize");
class AnalyticsController {
  constructor(eventsModel, categoriesModel, subcategoriesModel, petsModel) {
    this.eventsModel = eventsModel;
    this.categoriesModel = categoriesModel;
    this.subcategoriesModel = subcategoriesModel;
    this.petsModel = petsModel;
  }

  getEventsByCategory = async (req, res) => {
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
      const groupedEvents = await this.eventsModel.findAll({
        where: { petId },
        attributes: [
          ["category_id", "id"],
          [
            sequelize.fn("COUNT", sequelize.col("category_id")),
            "no_of_activities",
          ],
        ],
        group: "category_id",
        order: [[sequelize.fn("COUNT", sequelize.col("category_id")), "DESC"]],
      });
      return res.json(groupedEvents);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getEventsBySubcategory = async (req, res) => {
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
      const groupedEvents = await this.eventsModel.findAll({
        where: { petId },
        attributes: [
          ["subcategory_id", "id"],
          [
            sequelize.fn("COUNT", sequelize.col("subcategory_id")),
            "no_of_activities",
          ],
        ],
        group: "subcategory_id",
        order: [
          [sequelize.fn("COUNT", sequelize.col("subcategory_id")), "DESC"],
        ],
      });
      return res.json(groupedEvents);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = AnalyticsController;
