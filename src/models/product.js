'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.WarrantyAndRepair, { foreignKey: "productId" });
      Product.hasMany(models.GoodsReceiptDetail, { foreignKey: "productId" });
      Product.hasMany(models.ProductProvider, { foreignKey: "productId" });
      Product.hasMany(models.SaleProduct, { foreignKey: "productId" });
      Product.hasMany(models.BillDetail, { foreignKey: "productId" });
      Product.belongsTo(models.Catalogue, { foreignKey: "catalogueId" });
    }
  }
  Product.init({
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    buyingPrice: DataTypes.DECIMAL(20,2),
    sellingPrice: DataTypes.DECIMAL(20,2),
    sku: DataTypes.TEXT,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    available: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    defective: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    warranty: DataTypes.INTEGER,
    status: DataTypes.ENUM('in stock', 'stop selling', 'sold out'),
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Product',
  });
  return Product;
};