const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db");
const router = require("./router");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

sequelize.sync()
  .then(() => {
    const Quiz = require("./models/Quiz");
    const Question = require("./models/Question");

    Quiz.hasMany(Question, {
      foreignKey: "quiz_id", 
      as: "questionsList"
    });

    Question.belongsTo(Quiz, {
      foreignKey: "quiz_id", 
      as: "quizAssociation"
    });

    app.use("/api", router);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });