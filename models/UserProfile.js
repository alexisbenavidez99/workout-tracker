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
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergency_contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height : {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    current_weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    weight_loss_goal: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    workout_history: {
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
