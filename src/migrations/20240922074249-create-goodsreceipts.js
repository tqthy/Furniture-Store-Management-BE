'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GoodsReceipt', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      receiptDate: {
        type: Sequelize.DATEONLY
      },
      providerId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('accepted', 'pending', 'rejected')
      },
      totalCost: {
        type: Sequelize.INTEGER
      },
      shipping: {
        type: Sequelize.INTEGER
      },
      staffId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GoodsReceipt');
  }
};