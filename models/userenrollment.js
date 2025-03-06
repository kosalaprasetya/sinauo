'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserEnrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserEnrollment.belongsTo(models.User);
      UserEnrollment.hasOne(models.Course);
    }
  }
  UserEnrollment.init(
    {
      courseTitle: DataTypes.STRING,
      enrollDate: DataTypes.DATE,
      completeDate: DataTypes.DATE,
      isComplete: DataTypes.BOOLEAN,
      paymentStatus: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      CourseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserEnrollment',
    }
  );
  return UserEnrollment;
};
