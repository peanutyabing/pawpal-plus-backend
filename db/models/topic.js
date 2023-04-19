"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      this.hasMany(models.posttopic);
    }
  }
  Topic.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "topic",
      underscored: true,
    }
  );
  return Topic;
};
