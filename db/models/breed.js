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
        allowNull: false,
        references: { model: "species", key: "id" },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "breed",
      underscored: true,
    }
  );
  return Breed;
};
