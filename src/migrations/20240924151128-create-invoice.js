'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoice', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalCost: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('paid', 'canceled', 'pending')
      },
      paymentMethod: {
        type: Sequelize.ENUM('Cash', 'QR code')
      },
      customerId: {
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
    await queryInterface.dropTable('Invoice');
  }
};