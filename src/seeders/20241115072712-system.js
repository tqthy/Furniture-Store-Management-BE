'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('system', [
      {
        name: 'SaleStaff',
        value: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'InventoryStaff',
        value: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'RepairStaff',
        value: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('system', null, {});
  }
};
