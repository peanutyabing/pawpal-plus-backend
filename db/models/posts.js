"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      this.belongsTo(models.user);
    }
  }
  Posts.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "user", key: "id" },
      },
      title: DataTypes.STRING,

      content: DataTypes.STRING,
      private: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "posts",
      underscored: true,
    }
  );
  return Posts;
};
