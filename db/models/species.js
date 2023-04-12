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
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "species",
      underscored: true,
    }
  );
  return Species;
};
