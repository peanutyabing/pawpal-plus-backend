"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Food and drinks",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fun",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Resting",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Toileting",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Cleaning",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Healthcare",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Celebration",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
