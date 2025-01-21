import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizMakerLanding from "./Pages/QuizMakerLanding";
import QuizPage from "./Pages/QuizPage";
import ResultPage from "./Pages/ResultPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<QuizMakerLanding />} />
      <Route path="/quiz/:quizId" element={<QuizPage />} />
      <Route path="/results" element={<ResultPage />} />
    </Routes>
  </Router>
);

export default App;