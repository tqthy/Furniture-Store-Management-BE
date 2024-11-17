'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VariantReceiptDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      variantId: {
        type: Sequelize.INTEGER
      },
      goodsReceiptDetailsId: {
        type: Sequelize.INTEGER
      },
      importPrice: {
        type: Sequelize.DECIMAL(20, 2)
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
    await queryInterface.dropTable('VariantReceiptDetails');
  }
};