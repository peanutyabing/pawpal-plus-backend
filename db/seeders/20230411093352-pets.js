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
          breed_id: 2,
          name: "Ellen",
          image_url:
            "https://www.petfinder.com/static/039c6cd5ebd9f7819dd6eaa6998f4b4d/27d28/PF_Calico_600x260.webp",
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
            "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2023/02/09141023/Diana-the-Poodle.jpg",
          date_of_birth: new Date("2022-11-02"),
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
