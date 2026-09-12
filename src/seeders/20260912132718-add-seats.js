"use strict";

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
    let seats = [];
    let cols = ["A", "B", "C", "D", "E", "F"];
    for (let row = 1; row <= 100; row++) {
      for (let col of cols) {
        seats.push({
          airplaneId: 1,
          row,
          col,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert("Seats",  seats);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
