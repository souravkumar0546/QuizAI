const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);

const Quiz = sequelize.define("Quiz", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => nanoid(),
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
});

module.exports = Quiz;