'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventory.belongsTo(models.ProductVariant, { foreignKey: "variantId" });
    }
  }
  Inventory.init({
    variantId: DataTypes.INTEGER,
    available: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    defective: DataTypes.INTEGER,
    sold: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventory',
    tableName: 'Inventory',
  });
  return Inventory;
};