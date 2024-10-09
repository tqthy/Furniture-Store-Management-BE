'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PromotionUsageDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PromotionUsageDetails.belongsTo(models.Promotion, { foreignKey: "promotionId" });
      PromotionUsageDetails.belongsTo(models.InvoiceDetails, { foreignKey: "invoiceDetailsId" });
    }
  }
  PromotionUsageDetails.init({
    promotionId: DataTypes.INTEGER,
    invoiceDetailsId: DataTypes.INTEGER,
    discountAmount: DataTypes.DECIMAL(20,2),
    quantityDiscounted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PromotionUsageDetails',
  });
  return PromotionUsageDetails;
};