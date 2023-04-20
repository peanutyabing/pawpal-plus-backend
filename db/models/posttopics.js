"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostTopic extends Model {
    static associate(models) {
      this.belongsTo(models.post);
      this.belongsTo(models.topic);
    }
  }
  PostTopic.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        references: { model: "post", key: "id" },
      },
      topicId: {
        type: DataTypes.INTEGER,
        references: { model: "topic", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "posttopic",
      underscored: true,
    }
  );
  return PostTopic;
};
