const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Guest extends Model {}

// ::::: Table colum headings :::::
Guest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    guest_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    attending: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Event",
        key: "user_id"
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Event",
        key: "id",
      },
    },
  },
  // ::::: Writing `Guest` table to database :::::
  {
    sequelize,
    timsestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "guest",
  }
);

module.exports = Guest;
