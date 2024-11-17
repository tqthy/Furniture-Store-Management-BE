'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductVariant.belongsTo(models.Product, { foreignKey: "productId" });
      ProductVariant.hasMany(models.Inventory, { foreignKey: "variantId" });
      ProductVariant.hasMany(models.InventoryLog, { foreignKey: "variantId" });
      ProductVariant.hasMany(models.PromotionProduct, { foreignKey: "variantId" });
      ProductVariant.hasMany(models.GoodsReceiptDetails, { foreignKey: "variantId" });
      ProductVariant.hasMany(models.WarrantyAndRepair, { foreignKey: "variantId" });
      ProductVariant.hasMany(models.InvoiceDetails, { foreignKey: "variantId" });
      ProductVariant.hasMany(models.ProductProvider, { foreignKey: "variantId" });
    }
  }
  ProductVariant.init({
    SKU: DataTypes.TEXT,
    price: DataTypes.DECIMAL(20,2),
    buyingPrice: DataTypes.DECIMAL(20,2),
    status: DataTypes.ENUM('in stock', 'sold out'),
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProductVariant',
    tableName: 'ProductVariant',
  });
  return ProductVariant;
};