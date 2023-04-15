"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          user_id: 1,
          title: "post number 1",
          content: "this is my first post",
          private: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          title: "post number 3",
          content: "this is my Second post",
          private: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: "post number 2",
          content: "this is my first post",
          private: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
