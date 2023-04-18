"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      this.belongsTo(models.users);
      this.belongsTo(models.posts);
    }
  }
  Comments.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "user", key: "id" },
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "species", key: "id" },
      },
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comments",
      underscored: true,
    }
  );
  return Comments;
};
