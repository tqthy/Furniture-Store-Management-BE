'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InvoiceDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      cost: {
        type: Sequelize.DECIMAL(20,2)
      },
      unitPrice: {
        type: Sequelize.DECIMAL(20,2)
      },
      discountAmount: {
        type: Sequelize.DECIMAL(20,2)
      },
      promotionId: {
        type: Sequelize.INTEGER
      },
      variantId: {
        type: Sequelize.INTEGER
      },
      invoiceId: {
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
    await queryInterface.dropTable('InvoiceDetails');
  }
};