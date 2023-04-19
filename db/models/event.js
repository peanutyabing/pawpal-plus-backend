"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      this.belongsTo(models.pet);
      this.belongsTo(models.category);
      this.belongsTo(models.subcategory);
    }
  }
  Events.init(
    {
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "pet", key: "id" },
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "category", key: "id" },
      },
      subcategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "subcategory", key: "id" },
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: { type: DataTypes.DATE },
      causeForConcern: { type: DataTypes.BOOLEAN, defaultValue: false },
      description: DataTypes.STRING,
      data: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      remindMe: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "event",
      underscored: true,
    }
  );
  return Events;
};
