'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addConstraint('Staff', {
      fields: ['accountId'],
      type: 'foreign key',
      references: {
        table: 'Account',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('Account', {
      fields: ['roleId'],
      type: 'foreign key',
      references: {
        table: 'Role',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('RolePermission', {
      fields: ['roleId'],
      type: 'foreign key',
      references: {
        table: 'Role',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('RolePermission', {
      fields: ['permissionId'],
      type: 'foreign key',
      references: {
        table: 'Permission',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('WarrantyAndRepair', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('WarrantyAndRepair', {
      fields: ['customerId'],
      type: 'foreign key',
      references: {
        table: 'Customer',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('WarrantyAndRepair', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('GoodsReceipt', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('GoodsReceiptDetail', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('GoodsReceiptDetail', {
      fields: ['goodsReceiptId'],
      type: 'foreign key',
      references: {
        table: 'GoodsReceipt',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('ProductProvider', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('ProductProvider', {
      fields: ['providerId'],
      type: 'foreign key',
      references: {
        table: 'Provider',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('Product', {
      fields: ['catalogueId'],
      type: 'foreign key',
      references: {
        table: 'Catalogue',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('SaleProduct', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('SaleProduct', {
      fields: ['saleId'],
      type: 'foreign key',
      references: {
        table: 'Sale',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('BillDetail', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('BillDetail', {
      fields: ['billId'],
      type: 'foreign key',
      references: {
        table: 'Bill',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('Bill', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('Bill', {
      fields: ['customerId'],
      type: 'foreign key',
      references: {
        table: 'Customer',
        field: 'id'
      },
      onDelete: 'cascade'
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint('Staff', {
      fields: ['accountId'],
      type: 'foreign key',
      references: {
        table: 'Account',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('Account', {
      fields: ['roleId'],
      type: 'foreign key',
      references: {
        table: 'Role',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('RolePermission', {
      fields: ['roleId'],
      type: 'foreign key',
      references: {
        table: 'Role',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('RolePermission', {
      fields: ['permissionId'],
      type: 'foreign key',
      references: {
        table: 'Permission',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('WarrantyAndRepair', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('WarrantyAndRepair', {
      fields: ['customerId'],
      type: 'foreign key',
      references: {
        table: 'Customer',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('WarrantyAndRepair', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('GoodsReceipt', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('GoodsReceiptDetail', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('GoodsReceiptDetail', {
      fields: ['goodsReceiptId'],
      type: 'foreign key',
      references: {
        table: 'GoodsReceipt',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('ProductProvider', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('ProductProvider', {
      fields: ['providerId'],
      type: 'foreign key',
      references: {
        table: 'Provider',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('Product', {
      fields: ['catalogueId'],
      type: 'foreign key',
      references: {
        table: 'Catalogue',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('SaleProduct', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('SaleProduct', {
      fields: ['saleId'],
      type: 'foreign key',
      references: {
        table: 'Sale',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('BillDetail', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('BillDetail', {
      fields: ['billId'],
      type: 'foreign key',
      references: {
        table: 'Bill',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('Bill', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.removeConstraint('Bill', {
      fields: ['customerId'],
      type: 'foreign key',
      references: {
        table: 'Customer',
        field: 'id'
      },
      onDelete: 'cascade'
    })
  }
};
