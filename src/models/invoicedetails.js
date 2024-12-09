'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InvoiceDetails.belongsTo(models.ProductVariant, { foreignKey: "variantId" });
      InvoiceDetails.belongsTo(models.Invoice, { foreignKey: "invoiceId" });
      InvoiceDetails.belongsTo(models.Promotion, { foreignKey: "promotionId" });
      // 1 1 association with warranty
      InvoiceDetails.hasOne(models.Warranty, { foreignKey: "invoiceDetailsId" });
    }
  }
  InvoiceDetails.init({
    quantity: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    unitPrice: DataTypes.INTEGER,
    discountAmount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'InvoiceDetails',
    tableName: 'InvoiceDetails',
  });
  return InvoiceDetails;
};