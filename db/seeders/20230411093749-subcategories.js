"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "subcategories",
      [
        {
          category_id: 1,
          name: "Meal",
          min_hours_lapsed: 24,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 1,
          name: "Treat",
          min_hours_lapsed: 24 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 1,
          name: "Drink of water",
          min_hours_lapsed: 24,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 2,
          name: "Outing",
          min_hours_lapsed: 24 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 2,
          name: "Playtime with human",
          min_hours_lapsed: 24 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 2,
          name: "Playtime with self",
          min_hours_lapsed: 24 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 3,
          name: "Sleep or nap",
          min_hours_lapsed: 24 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 3,
          name: "Chillaxing",
          min_hours_lapsed: 24 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 4,
          name: "Urination",
          min_hours_lapsed: 24,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 4,
          name: "Defecation",
          min_hours_lapsed: 24 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 5,
          name: "Self-grooming",
          min_hours_lapsed: 24 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 5,
          name: "Professional grooming",
          min_hours_lapsed: 24 * 30,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 5,
          name: "Brushing",
          min_hours_lapsed: 24 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 5,
          name: "Shower or bath",
          min_hours_lapsed: 24 * 30,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 6,
          name: "Medication",
          min_hours_lapsed: 24,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 6,
          name: "Visit to the vet",
          min_hours_lapsed: 24 * 365,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 6,
          name: "Weighing",
          min_hours_lapsed: 24 * 30,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 6,
          name: "Vomit",
          min_hours_lapsed: 24 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 7,
          name: "Birthday",
          min_hours_lapsed: 24 * 365,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 7,
          name: "Adoption anniversary",
          min_hours_lapsed: 24 * 365,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("subcategories", null, {});
  },
};
