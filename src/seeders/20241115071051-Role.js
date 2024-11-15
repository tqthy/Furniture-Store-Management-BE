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
        name: 'SaleStaff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'InventoryStaff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },      {
        name: 'RepairStaff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role', null, {});
  },
};