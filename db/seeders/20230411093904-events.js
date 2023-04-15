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
          start_time: new Date("2023-04-13T05:00:00.000Z"),
          end_time: new Date("2023-04-13T05:15:00.000Z"),
          description: "Ellen lied in the sunny spot for 30 minutes.",
          location_details: "On the living room rug",
          remind_me: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 1,
          name: "Taking a nap",
          start_time: new Date("2023-04-14T01:00:00.000Z"),
          end_time: new Date("2023-04-14T03:35:00.000Z"),
          description: "Ellen took a good nap.",
          location_details: "On the green chair",
          remind_me: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 2,
          name: "Taking antibiotics",
          start_time: new Date(new Date() - 60000),
          end_time: new Date(),
          description: "Carl took his antibiotics like a champ.",
          remind_me: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 1,
          name: "Grooming",
          start_time: new Date(new Date() - 60000),
          end_time: new Date(),
          description: "Ellen cleaned her paws and face.",
          remind_me: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 1,
          name: "Treat",
          start_time: new Date(new Date() - 60000),
          end_time: new Date(),
          description: "Ellen got some venison for good behavior.",
          remind_me: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 1,
          name: "Treat",
          start_time: new Date("2023-04-01"),
          end_time: new Date("2023-04-01"),
          description: "Ellen got some lamb for good behavior.",
          remind_me: false,
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
