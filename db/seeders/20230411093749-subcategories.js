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
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 1,
          name: "Treat",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 1,
          name: "Water",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 2,
          name: "Outing",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 2,
          name: "Playing with human",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 2,
          name: "Playing with self",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 3,
          name: "Sleeping/ napping",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 3,
          name: "Chillaxing",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 4,
          name: "Urination",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 4,
          name: "Defecation",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 5,
          name: "Self-grooming",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 5,
          name: "Professional grooming",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 5,
          name: "Brushing",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 5,
          name: "Shower/ bath",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 6,
          name: "Taking medication",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 6,
          name: "Visiting the vet",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 6,
          name: "Being weighed",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 6,
          name: "Vomiting",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 7,
          name: "Birthday",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 7,
          name: "Adoption anniversary",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_id: 7,
          name: "First _____",
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
