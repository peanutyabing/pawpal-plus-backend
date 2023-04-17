"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    static associate(models) {
      this.belongsTo(models.category);
      this.hasMany(models.event);
    }
  }
  Subcategory.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "category", key: "id" },
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "subcategory",
      underscored: true,
    }
  );
  return Subcategory;
};
