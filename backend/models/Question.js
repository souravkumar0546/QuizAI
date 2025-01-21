const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Quiz = require("./Quiz");

const Question = sequelize.define("Question", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quiz_id: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  option_a: { type: DataTypes.TEXT, allowNull: false },
  option_b: { type: DataTypes.TEXT, allowNull: false },
  option_c: { type: DataTypes.TEXT, allowNull: false },
  option_d: { type: DataTypes.TEXT, allowNull: false },
  correct_answer: { type: DataTypes.STRING, allowNull: false },
});

Question.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
  as: 'quiz'
});

module.exports = Question;