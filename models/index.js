const User = require("./User");
const Event = require("./Events");
const Guest = require("./Guest");

// User hasMany Events
User.hasMany(Event, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Events belongsTo User
Event.belongsTo(User, {
  foreignKey: "user_id",
});

Event.hasMany(Guest, {
  foreignKey: "event_id",
  onDelete: "CASCADE",
});

Guest.belongsTo(Event, {
  foreignKey: "event_id",
});

module.exports = { User, Event, Guest };
