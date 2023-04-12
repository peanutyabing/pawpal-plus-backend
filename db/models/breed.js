"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Breed extends Model {
    static associate(models) {
      this.belongsTo(models.species);
      this.hasMany(models.pet);
    }
  }
  Breed.init(
    {
      speciesId: {
        type: DataTypes.INTEGER,
        references: { model: "species", key: "id" },
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "breed",
      underscored: true,
    }
  );
  return Breed;
};
