'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Categories', [{
      category_name: 'electronics',
      sub_categories: 'mobiles',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category_name: 'vehicles',
      sub_categories: 'cars',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category_name: 'furniture',
      sub_categories: 'bed',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
