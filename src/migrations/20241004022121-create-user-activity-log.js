'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserActivityLog', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      staffId: {
        type: Sequelize.INTEGER
      },
      action: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.TEXT
      },
      ipAddress: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      recordId: {
        type: Sequelize.INTEGER
      },
      previousData: {
        type: Sequelize.TEXT
      },
      newDate: {
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
    await queryInterface.dropTable('UserActivityLog');
  }
};