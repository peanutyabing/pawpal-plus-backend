"use strict";

const getData = require("../../utils/breed-parser.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = await getData();
    await queryInterface.bulkInsert("breeds", data, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("breeds", null, {});
  },
};
