"use strict";

const getData = require("../../utils/event-parser.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = await getData();
    await queryInterface.bulkInsert("events", data, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("events", null, {});
  },
};
