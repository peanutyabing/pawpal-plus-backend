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
        type: DataTypes.INTEGER,
        references: { model: "category", key: "id" },
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
        references: { model: "subcategory", key: "id" },
      },
      name: DataTypes.STRING,
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      endTime: { type: DataTypes.DATE, defaultValue: new Date() },
      causeForConcern: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      data: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      locationDetails: DataTypes.STRING,
      remindMe: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "event",
      underscored: true,
    }
  );
  return Events;
};
