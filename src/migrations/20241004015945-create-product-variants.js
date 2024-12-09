'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductVariant', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SKU: {
        type: Sequelize.TEXT
      },
      productId: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER,
      },
      buyingPrice: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('in stock', 'sold out')
      },
      color: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('ProductVariant');
  }
};