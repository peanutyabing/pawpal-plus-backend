"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "species",
      [
        {
          name: "cat",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "dog",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("species", null, {});
  },
};
