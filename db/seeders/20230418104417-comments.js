"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          user_id: 1,
          post_id: 1,
          content: "user 1 comment for post 1",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          post_id: 2,
          content: "user 1 comment for post 2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          post_id: 1,
          content: "user 2 comment for post 1",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
