"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Species extends Model {
    static associate(models) {
      this.hasMany(models.pet);
      this.hasMany(models.breed);
    }
  }
  Species.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "species",
      underscored: true,
    }
  );
  return Species;
};
