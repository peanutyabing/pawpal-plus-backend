"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          user_id: 1,
          title: "IF YOU NEED HELP, GO TO A VET CLINIC",
          content:
            "He said that he had always taught his children that if they were ever in a place they didn’t know and needed help, they should find a veterinary hospital. “People in vet clinics are almost certain to be good and kind and to want to help.” ",

          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          title: "MANAGING THE NEGATIVITY OF OTHERS",
          content:
            "Regardless of where you go, 3-5% of people are having a hard time. They’re angry, distracted, confused, self-centered, hangry, misinformed, or otherwise failing to shine as a beacon of happiness or organization. I bet you’ve even been one of these people at some point. I know I have.",

          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: "TINY WORLD VACATIONS AND WHY TO BOOK ONE",
          content:
            "Humans aren’t meant to process a world as big as ours has become. We are made to understand local events and deal with problems that we can, if not directly affect, then at least see with our own eyes.",

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
