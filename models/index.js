const User = require('./User');
// add associations

User.hasMany(Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Workout.belongsTo(User, {   
    foreignKey: 'user_id'
});





module.exports = { User };