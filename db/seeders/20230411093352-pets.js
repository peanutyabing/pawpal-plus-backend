"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "pets",
      [
        {
          user_id: 1,
          species_id: 1,
          breed_id: 28,
          name: "Ellen",
          image_url:
            "https://images.unsplash.com/photo-1592328555746-1047e76a71bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
          date_of_birth: new Date("2020-04-09"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          species_id: 2,
          breed_id: 4,
          name: "Carl",
          image_url:
            "https://images.unsplash.com/photo-1581562324420-eff2f5aaa4b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
          date_of_birth: new Date("2022-11-02"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          species_id: 1,
          breed_id: 28,
          name: "Manja",
          image_url:
            "https://images.unsplash.com/photo-1560948799-e17458123a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          date_of_birth: new Date("2018-04-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("pets", null, {});
  },
};
