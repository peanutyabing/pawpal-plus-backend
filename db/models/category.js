"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.event);
      this.hasMany(models.subcategory);
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      allowNull: false,
    },
    {
      sequelize,
      modelName: "category",
      underscored: true,
    }
  );
  return Category;
};
