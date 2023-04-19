"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posttopics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
      },
      topic_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "topics",
          key: "id",
        },
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("posttopics");
  },
};
