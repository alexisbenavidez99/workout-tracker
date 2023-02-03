const User = require('./User');
const UserProfile= require('./UserProfile');
const Workout = require('./workout');

// add associations

User.hasMany(Workout, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Workout.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasOne(UserProfile, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

UserProfile.belongsTo(User, {
  foreignKey: 'user_id'
});






module.exports = { User, Workout, UserProfile };