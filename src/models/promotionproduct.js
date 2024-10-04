'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PromotionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PromotionProduct.belongsTo(models.ProductVariant, { foreignKey: "variantId" });
      PromotionProduct.belongsTo(models.Promotion, { foreignKey: "promotionId" });
    }
  }
  PromotionProduct.init({
    discount: DataTypes.INTEGER, 
  }, {
    sequelize,
    modelName: 'PromotionProduct',
    tableName: 'PromotionProduct',
  });
  return PromotionProduct;
};