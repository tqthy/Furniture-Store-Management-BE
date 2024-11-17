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
      onDelete: 'cascade',
      name: "FK_01"
    })

    await queryInterface.addConstraint('Account', {
      fields: ['roleId'],
      type: 'foreign key',
      references: {
        table: 'Role',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_02"
    })

    await queryInterface.addConstraint('RolePermission', {
      fields: ['roleId'],
      type: 'foreign key',
      references: {
        table: 'Role',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_03"
    })

    await queryInterface.addConstraint('RolePermission', {
      fields: ['permissionId'],
      type: 'foreign key',
      references: {
        table: 'Permission',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_04",
    })

    await queryInterface.addConstraint('WarrantyAndRepair', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_05"
    })

    await queryInterface.addConstraint('WarrantyAndRepair', {
      fields: ['customerId'],
      type: 'foreign key',
      references: {
        table: 'Customer',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_06"
    })

    await queryInterface.addConstraint('WarrantyAndRepair', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_07"
    })

    await queryInterface.addConstraint('GoodsReceipt', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_08"
    })

    await queryInterface.addConstraint('GoodsReceipt', {
      fields: ['providerId'],
      type: 'foreign key',
      references: {
        table: 'Provider',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_09"
    })

    await queryInterface.addConstraint('GoodsReceiptDetails', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_10"
    })

    await queryInterface.addConstraint('GoodsReceiptDetails', {
      fields: ['goodsReceiptId'],
      type: 'foreign key',
      references: {
        table: 'GoodsReceipt',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_11"
    })

    await queryInterface.addConstraint('ProductProvider', {
      fields: ['providerId'],
      type: 'foreign key',
      references: {
        table: 'Provider',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_12"
    })

    await queryInterface.addConstraint('ProductProvider', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_13"
    })

    await queryInterface.addConstraint('Product', {
      fields: ['catalogueId'],
      type: 'foreign key',
      references: {
        table: 'Catalogue',
        field: 'id'
      },
      onDelete: 'SET NULL',
      name: "FK_14"
    })

    await queryInterface.addConstraint('ProductVariant', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Product',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_15"
    })

    await queryInterface.addConstraint('InvoiceDetails', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_16"
    })

    await queryInterface.addConstraint('InvoiceDetails', {
      fields: ['invoiceId'],
      type: 'foreign key',
      references: {
        table: 'Invoice',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_17"
    })

    await queryInterface.addConstraint('InvoiceDetails', {
      fields: ['promotionId'],
      type: 'foreign key',
      references: {
        table: 'Promotion',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_27"
    })

    await queryInterface.addConstraint('Invoice', {
      fields: ['customerId'],
      type: 'foreign key',
      references: {
        table: 'Customer',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_18"
    })

    await queryInterface.addConstraint('Invoice', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_19"
    })

    await queryInterface.addConstraint('Inventory', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_20"
    })

    await queryInterface.addConstraint('InventoryLog', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_21"
    })

    await queryInterface.addConstraint('PromotionProduct', {
      fields: ['variantId'],
      type: 'foreign key',
      references: {
        table: 'ProductVariant',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_22"
    })

    await queryInterface.addConstraint('PromotionProduct', {
      fields: ['promotionId'],
      type: 'foreign key',
      references: {
        table: 'Promotion',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_23"
    })

    await queryInterface.addConstraint('UserActivityLog', {
      fields: ['staffId'],
      type: 'foreign key',
      references: {
        table: 'Staff',
        field: 'id'
      },
      onDelete: 'cascade',
      name: "FK_26"
    })
  },

  async down (queryInterface, Sequelize) {
    /*************************************************************************************************************************
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     ***********************************************************************************************************************/
    await queryInterface.removeConstraint('Staff', "FK_01")
    await queryInterface.removeConstraint('Account', "FK_02")
    await queryInterface.removeConstraint('RolePermission', "FK_03")
    await queryInterface.removeConstraint('RolePermission', "FK_04")
    await queryInterface.removeConstraint('WarrantyAndRepair', "FK_05")
    await queryInterface.removeConstraint('WarrantyAndRepair', "FK_06")
    await queryInterface.removeConstraint('WarrantyAndRepair', "FK_07")
    await queryInterface.removeConstraint('GoodsReceipt', "FK_08")
    await queryInterface.removeConstraint('GoodsReceipt', "FK_09")
    await queryInterface.removeConstraint('GoodsReceiptDetails', "FK_10")
    await queryInterface.removeConstraint('GoodsReceiptDetails', "FK_11")
    await queryInterface.removeConstraint('ProductProvider', "FK_12")
    await queryInterface.removeConstraint('ProductProvider', "FK_13")
    await queryInterface.removeConstraint('Product', "FK_14")
    await queryInterface.removeConstraint('ProductVariant', "FK_15")
    await queryInterface.removeConstraint('InvoiceDetails', "FK_16")
    await queryInterface.removeConstraint('InvoiceDetails', "FK_17")
    await queryInterface.removeConstraint('Invoice', "FK_18")
    await queryInterface.removeConstraint('Invoice', "FK_19")
    await queryInterface.removeConstraint('Inventory', "FK_20")
    await queryInterface.removeConstraint('InventoryLog', "FK_21")
    await queryInterface.removeConstraint('PromotionProduct', "FK_22")
    await queryInterface.removeConstraint('PromotionProduct', "FK_23")
    await queryInterface.removeConstraint('UserActivityLog', "FK_26")
    await queryInterface.removeConstraint('InvoiceDetails', "FK_27")
  }
};
