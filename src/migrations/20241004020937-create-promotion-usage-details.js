'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PromotionUsageDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      promotionId: {
        type: Sequelize.INTEGER
      },
      invoiceDetailsId: {
        type: Sequelize.INTEGER
      },
      discountAmount: {
        type: Sequelize.DECIMAL(20,2)
      },
      quantityDiscounted: {
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
    await queryInterface.dropTable('PromotionUsageDetails');
  }
};