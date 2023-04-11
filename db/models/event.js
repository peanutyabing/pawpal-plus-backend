"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      this.belongsTo(models.pet);
    }
  }
  Events.init(
    {
      petId: {
        type: DataTypes.INTEGER,
        references: { model: "pet", key: "id" },
      },
      name: DataTypes.STRING,
      time: DataTypes.DATE,
      description: DataTypes.STRING,
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
