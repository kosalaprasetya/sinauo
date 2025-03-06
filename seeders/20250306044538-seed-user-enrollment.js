'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data/user_enrollments.json').map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    // console.log(data);
    await queryInterface.bulkInsert('UserEnrollments', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserEnrollments', null, {});
  },
};
