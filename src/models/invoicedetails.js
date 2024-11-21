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
    }
  }
  InvoiceDetails.init({
    quantity: DataTypes.INTEGER,
    cost: DataTypes.DECIMAL(20,2),
    unitPrice: DataTypes.DECIMAL(20,2),
    discountAmount: DataTypes.DECIMAL(20,2),
  }, {
    sequelize,
    modelName: 'InvoiceDetails',
    tableName: 'InvoiceDetails',
  });
  return InvoiceDetails;
};