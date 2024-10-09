'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promotion.hasMany(models.PromotionProduct, { foreignKey: "promotionId" });
      Promotion.hasMany(models.PromotionUsageDetails, { foreignKey: "promotionId" });
    }
  }
  Promotion.init({
    finishDate: DataTypes.DATEONLY,
    startDate: DataTypes.DATEONLY,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Promotion',
    tableName: 'Promotion',
  });
  return Promotion;
};