'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('CourseCategories', 'CategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CourseCategories', 'CategoryId');
  },
};
