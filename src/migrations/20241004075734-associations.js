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
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
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

    await queryInterface.addConstraint('GoodsReceipt', {
      fields: ['providerId'],
      type: 'foreign key',
      references: {
        table: 'Provider',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('GoodsReceiptDetails', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('GoodsReceiptDetails', {
      fields: ['goodsReceiptId'],
      type: 'foreign key',
      references: {
        table: 'GoodsReceipt',
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

    await queryInterface.addConstraint('ProductProvider', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
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

    await queryInterface.addConstraint('ProductVariant', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('InvoiceDetails', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('InvoiceDetails', {
      fields: ['invoiceId'],
      type: 'foreign key',
      references: {
        table: 'Invoice',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('Invoice', {
      fields: ['customerId'],
      type: 'foreign key',
      references: {
        table: 'Customer',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('Invoice', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('Inventory', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('InventoryLog', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('PromotionProduct', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('PromotionProduct', {
      fields: ['promotionId'],
      type: 'foreign key',
      references: {
        table: 'Promotion',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('PromotionUsageDetails', {
      fields: ['promotionId'],
      type: 'foreign key',
      references: {
        table: 'Promotion',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('PromotionUsageDetails', {
      fields: ['invoiceDetailsId'],
      type: 'foreign key',
      references: {
        table: 'InvoiceDetails',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('UserActivityLog', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
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
  }
};
