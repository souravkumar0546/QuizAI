import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/quiz/${quizId}`);
        if (response.ok) {
          const data = await response.json();
          setQuizData(data);
        } else {
          console.error("Failed to fetch quiz data");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleOptionChange = (questionId, selectedOption) => {
    setResponses({ ...responses, [questionId]: selectedOption });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    navigate("/results", { state: { quizData, responses } });
  };

  if (!quizData) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{quizData.title}</h1>
      <p>{quizData.description}</p>
      {quizData.questionsList.map((question, index) => (
        <div key={question.id} style={{ marginBottom: "20px" }}>
          <p>
            {index + 1}. {question.text}
          </p>
          {["A", "B", "C", "D"].map((option) => (
            <label key={option} style={{ display: "block", textAlign: "left", margin: "0 auto", width: "300px" }}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                onChange={() => handleOptionChange(question.id, option)}
                disabled={submitted}
              />
              {question[`option_${option.toLowerCase()}`]}
            </label>
          ))}
        </div>
      ))}
      {!submitted ? (
        <button onClick={handleSubmit} style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}>
          Submit Quiz
        </button>
      ) : (
        <p>Thank you for taking the quiz!</p>
      )}
    </div>
  );
};

export default QuizPage;