"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.species);
      this.belongsTo(models.breed);
      this.hasMany(models.event);
    }
  }
  Pet.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "user", key: "id" },
      },
      speciesId: {
        type: DataTypes.INTEGER,
        references: { model: "species", key: "id" },
      },
      breedId: {
        type: DataTypes.INTEGER,
        references: { model: "breed", key: "id" },
      },
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "pet",
      underscored: true,
    }
  );
  return Pet;
};
