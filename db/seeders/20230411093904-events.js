"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "events",
      [
        {
          pet_id: 1,
          category_id: 3,
          subcategory_id: 8,
          start_time: new Date("2023-03-13T05:00:00.000Z"),
          end_time: new Date("2023-03-13T05:15:00.000Z"),
          cause_for_concern: false,
          description: "Sun bathing for 30 minutes.",
          remind_me: false,
          latest: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 1,
          category_id: 3,
          subcategory_id: 7,
          start_time: new Date("2023-03-14T01:00:00.000Z"),
          end_time: new Date("2023-03-14T03:35:00.000Z"),
          cause_for_concern: false,
          description: "Ellen took a good nap on the green chair.",
          remind_me: false,
          latest: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 2,
          category_id: 6,
          subcategory_id: 15,
          start_time: new Date("2023-04-14T01:00:00.000Z"),
          end_time: new Date("2023-04-14T01:01:00.000Z"),
          cause_for_concern: false,
          description: "Carl took his antibiotics like a champ.",
          remind_me: true,
          latest: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 1,
          category_id: 5,
          subcategory_id: 11,
          start_time: new Date("2023-04-14T17:00:00.000Z"),
          end_time: new Date("2023-04-14T17:10:00.000Z"),
          cause_for_concern: false,
          description: "Ellen cleaned her paws and face.",
          remind_me: false,
          latest: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 1,
          category_id: 1,
          subcategory_id: 2,
          start_time: new Date("2023-04-14T18:00:00.000Z"),
          end_time: new Date("2023-04-14T18:01:00.000Z"),
          cause_for_concern: false,
          description: "Ellen got some lamb for good behavior.",
          remind_me: true,
          latest: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 1,
          category_id: 1,
          subcategory_id: 2,
          start_time: new Date("2023-04-14T22:00:00.000Z"),
          end_time: new Date("2023-04-14T22:03:00.000Z"),
          cause_for_concern: false,
          description: "Ellen got some venison for good behavior.",
          remind_me: true,
          latest: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pet_id: 1,
          category_id: 5,
          subcategory_id: 13,
          start_time: new Date("2023-04-15T14:00:00.000Z"),
          end_time: new Date("2023-04-15T14:10:00.000Z"),
          cause_for_concern: false,
          description:
            "Ellen got a thorough brushing. A giant hairball averted.",
          remind_me: true,
          latest: true,
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
