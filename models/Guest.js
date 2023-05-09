const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const guest = "./guest"
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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
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
