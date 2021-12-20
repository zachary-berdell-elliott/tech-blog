const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class Comments extends Model {}

Comments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      commentContent: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      blog_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'blog',
          key: 'id',
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
  },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment',
    }
);

module.exports = Comments;