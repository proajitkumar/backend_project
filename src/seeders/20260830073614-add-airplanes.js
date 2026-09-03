"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Airplanes", [
      {
        modelNumber: "boing001",
        capacity: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "airbus001",
        capacity: 460,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    queryInterface.bulkDelete("Airplanes", {
      [Op.or]: [
        {
          modelNumber: "boing001",
        },
        {
          modelNumber: "airbus001",
        },
      ],
    });
  },
};
