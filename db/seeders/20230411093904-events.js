"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "events",
      [
        {
          pet_id: 1,
          name: "Sun bathing",
          time: new Date(),
          description: "Ellen lied in the sunny spot for 30 minutes.",
          location_details: "On the living room rug",
          remind_me: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 2,
          name: "Taking antibiotics",
          time: new Date(),
          description: "Carl took his antibiotics like a champ this evening.",
          remind_me: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("events", null, {});
  },
};
