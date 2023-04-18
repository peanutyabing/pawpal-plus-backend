"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      this.belongsTo(models.post);
      this.belongsTo(models.topic);
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
