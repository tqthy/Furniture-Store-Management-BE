'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserActivityLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserActivityLog.belongsTo(models.Staff, { foreignKey: "staffId" });
    }
  }
  UserActivityLog.init({
    action: DataTypes.TEXT,
    type: DataTypes.TEXT,
    ipAddress: DataTypes.TEXT,
    description: DataTypes.TEXT,
    recordId: DataTypes.INTEGER,
    previousData: DataTypes.TEXT,
    newDate: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'UserActivityLog',
  });
  return UserActivityLog;
};