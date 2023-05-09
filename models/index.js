const User = require("./User");
const Event = require("./Events");
const Guest = require("./Guest")
// User hasMany Events
User.hasMany(Event, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Events belongsTo User
Event.belongsTo(User, {
    foreignKey: 'user_id'
});

// Event hasMany Guests
Event.hasMany(Guest, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Guest belongsTo Event
Guest.belongsTo(Event, {
    foreignKey: 'user_id'
});

module.exports = { User, Event};