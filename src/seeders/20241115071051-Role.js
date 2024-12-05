module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Role', [
      {
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sale Staff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Inventory Staff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },      {
        name: 'Repair Staff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role', null, {});
  },
};