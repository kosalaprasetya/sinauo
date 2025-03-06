'use strict';
const { Model } = require('sequelize');
const Helper = require('../helper/index.js');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasOne(models.UserEnrollment);
      Course.hasMany(models.CourseCategory);
      Course.belongsToMany(models.Category, { through: models.CourseCategory });
    }

    get coursePrice() {
      return Helper.currencyRupiah(this.price);
    }

    discount(amount) {
      const discountPercentage = amount / 100;
      const discountAmount = this.price * discountPercentage;
      return this.price - discountAmount;
    }

    static async findAffordableCourses(maxPrice) {
      return await this.findAll({
        where: {
          price: {
            [sequelize.Op.lte]: maxPrice, // harga <= maxPrice
          },
        },
        order: [['price', 'ASC']], // urutkan dari harga termurah
      });
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      enrollmentCount: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Course',
    },
    {
      hooks: {
        beforeCreate(instance, option) {
          instance.enrollmentCount = 10;
        },
      },
    }
  );
  return Course;
};
