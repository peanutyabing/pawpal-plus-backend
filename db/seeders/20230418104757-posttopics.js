"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "posttopics",
      [
        {
          post_id: 1,
          topic_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          post_id: 2,
          topic_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("posttopics", null, {});
  },
};
