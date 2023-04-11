"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "breeds",
      [
        {
          species_id: 1,
          name: "British Shorthair",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          species_id: 1,
          name: "Domestic Shorthair",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          species_id: 2,
          name: "Great Dane",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          species_id: 2,
          name: "Poodle",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("breeds", null, {});
  },
};
