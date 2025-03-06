'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data/courses.json').map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    // console.log(data);
    await queryInterface.bulkInsert('Courses', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
