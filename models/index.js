const User = require("./User");
const Events = require("./Events");

//User hasMany Post
User.hasMany(Events, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//Post belongsTo User
Events.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Events};