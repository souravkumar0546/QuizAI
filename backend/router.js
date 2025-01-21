const express = require("express");
const axios = require("axios");
const Quiz = require("./models/Quiz");
const Question = require("./models/Question");
const router = express.Router();


const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


function countWords(str) {
  return str.trim().split(/\s+/).length;
}

router.post("/create-quiz", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required to generate the quiz." });
  }

  const wordCount = countWords(content);
  if (wordCount < 350) {
    return res.status(400).json({ error: "Content must have at least 350 words." });
  }
  if (wordCount > 5000) {
    return res.status(400).json({ error: "Content must not exceed 5000 words." });
  }

  try {
    const prompt = `Hi Gemini, generate a quiz based on the following content:\n\n${content}\n\nThe quiz should have the following structure:\nTitle: [Quiz Title]\nDescription: [Quiz Description]\nQuestions:\n1. [Question Text]\n   A. [Option A]\n   B. [Option B]\n   C. [Option C]\n   D. [Option D]\n   Answer: [Correct Answer (A/B/C/D)]\n\nReturn the quiz in this JSON format:\n{\n  "title": "Quiz Title",\n  "description": "Quiz Description",\n  "questions": [\n    {\n      "text": "Question Text",\n      "option_a": "Option A",\n      "option_b": "Option B",\n      "option_c": "Option C",\n      "option_d": "Option D",\n      "correct_answer": "A"\n    },\n    ...\n  ]\n}`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    if (!response.data || !response.data.candidates || response.data.candidates.length === 0) {
      return res.status(502).json({ error: "Invalid response from Gemini AI." });
    }

    let geminiOutput = response.data.candidates[0].content.parts[0].text;
    geminiOutput = geminiOutput.replace(/^```/, '').replace(/^json\n/, '').replace(/```/, '');

    let generatedQuiz;
    try {
      generatedQuiz = JSON.parse(geminiOutput);
    } catch (err) {
      console.error("Failed to parse Gemini response:", err);
      return res.status(500).json({ error: "Failed to parse Gemini response. The structure may be incorrect." });
    }

    if (!generatedQuiz.title || !generatedQuiz.questions || !Array.isArray(generatedQuiz.questions)) {
      return res.status(422).json({ error: "Gemini response is missing required quiz fields." });
    }
    
    const newQuiz = await Quiz.create({
      title: generatedQuiz.title,
      description: generatedQuiz.description || "No description provided",
    });

    const questions = generatedQuiz.questions.map((q) => ({
      quiz_id: newQuiz.id,
      text: q.text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_answer: q.correct_answer,
    }));

    await Question.bulkCreate(questions);

    res.status(201).json({ quizId: newQuiz.id });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Failed to create quiz. Please try again later." });
  }
});

router.get("/quiz/:id", async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findOne({
      where: { id: quizId },
      include: [{
        model: Question,
        as: 'questionsList',
        attributes: { exclude: ['correct_answer'] }
      }],
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ error: "Failed to fetch quiz. Please try again later." });
  }
});
router.post("/get-result", async (req, res) => {
  const { quizId, responses } = req.body;

  try {
    const quiz = await Quiz.findOne({
      where: { id: quizId },
      include: [{ model: Question, as: 'questionsList' }],
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }


    const score = quiz.questionsList.reduce((total, question) => {
      const correctOption = question.correct_answer;
      return responses[question.id] === correctOption ? total + 1 : total;
    }, 0);


    res.status(200).json({
      score,
      totalQuestions: quiz.questionsList.length,
      questionsWithAnswers: quiz.questionsList,
    });
  } catch (error) {
    console.error("Error calculating results:", error);
    res.status(500).json({ error: "Failed to calculate results. Please try again later." });
  }
});

module.exports = router;