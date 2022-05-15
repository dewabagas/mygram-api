'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userid',
        as: 'user'
      })

      this.hasMany(models.Comment, {
        foreignKey: 'photoid',
        as: 'comments',
      })
    }
  }
  Photo.init({
    title: DataTypes.STRING,
    caption: DataTypes.TEXT,
    poster_image_url: DataTypes.TEXT,
    userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};