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
      status: {
        type: Sequelize.ENUM('accepted', 'pending', 'rejected')
      },
      totalCost: {
        type: Sequelize.DECIMAL(20,2)
      },
      shipping: {
        type: Sequelize.DECIMAL(20,2)
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