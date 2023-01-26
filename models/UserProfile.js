const { Model, DataTypes } = require('sequelize');

class UserProfile extends Model {

}

UserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
      allowNull: false
    },
    current_weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    weight_loss_goal: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    favorite_exercises: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_profile',
  }
);
