'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RepairOrder', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('pending', 'processing', 'done')
      },
      cost: {
        type: Sequelize.DECIMAL
      },
      details: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      productName: {
        type: Sequelize.STRING
      },
      estimateFinishDate: {
        type: Sequelize.DATEONLY
      },
      finishDate: {
        type: Sequelize.DATEONLY
      },
      staffId: {
        type: Sequelize.INTEGER
      },
      customerId: {
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
    await queryInterface.dropTable('RepairOrder');
  }
};