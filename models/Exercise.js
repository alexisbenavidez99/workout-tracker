const { Model, DataTypes } = require('sequelize');

class Exercise extends Model {
}

Exercise.init(
{
id: {
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
},
workout_id: {
type: DataTypes.INTEGER,
allowNull: false,
references: {
model: 'workouts',
key: 'id'
}
},
name: {
type: DataTypes.STRING,
allowNull: false,
},
weight: {
type: DataTypes.FLOAT,
allowNull: true,
},
sets: {
type: DataTypes.INTEGER,
allowNull: true,
},
reps: {
type: DataTypes.INTEGER,
allowNull: true,
},
},
{
sequelize,
timestamps: false,
freezeTableName: true,
underscored: true,
modelName: 'exercise',
}
);

Exercise.associate = (models) => {
Exercise.belongsTo(models.Workout, {
foreignKey: 'workout_id',
as: 'workout'
});
};

module.exports = Exercise;