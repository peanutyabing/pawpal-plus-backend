"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "peanut",
          email: "peanut@test.come",
          auth_token: "i#am#encrypted",
          image_url:
            "https://img.freepik.com/free-vector/vector-set-whole-peanuts-with-shell-close-up-top-view-isolated-white-background_1284-46380.jpg?w=1800&t=st=1681205086~exp=1681205686~hmac=277a4ba675f79a81aa2454c645004008a4690d06155f66b857a5b794ca23dfe7",
          country: "Singapore",
          region: "South West",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "almond",
          email: "almond@test.come",
          auth_token: "definitely#encrypted",
          image_url:
            "https://img.freepik.com/premium-vector/nut-almond-food-healthy-diet-vector-illustration_352905-470.jpg?w=1800",
          country: "Singapore",
          region: "North East",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
