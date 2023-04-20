"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "topics",
      [
        {
          name: "Vets",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Health",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Activites",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("topics", null, {});
  },
};
