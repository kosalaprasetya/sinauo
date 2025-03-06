'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserEnrollment);
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: `Name cannot be empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: `Email cannot be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: `Password cannot be empty`
        }
      }
    },
    profilePicture: DataTypes.STRING,
    bio: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  //hook role otomatis jadi 'student', profile picture jadi di assets, bio biar ga null
  //pasang bcrypt buat hash password
  User.addHook('beforeCreate', (users) => {
    if(!users.role){
      users.role = 'student'
    }
    if(!users.profilePicture){
      users.profilePicture = 'images/logo.png'
    }
    if(!users.bio){
      users.bio = ''
    }
    
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(users.password, salt)
    users.password = hash
  })
  return User;
};
