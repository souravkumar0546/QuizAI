import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const { quizData, responses } = location.state || {};
  const [score, setScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!quizData || !responses) {
        console.error("Missing quizData or responses");
        return;
      }

      try {
        console.log("Sending request to get results...");
        const response = await fetch("http://localhost:8000/api/get-result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quizId: quizData.id, responses }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Received result data:", data);
          setScore(data.score);
          setTotalQuestions(data.totalQuestions);
          setQuestionsWithAnswers(data.questionsWithAnswers || []);
        } else {
          console.error("Failed to fetch results, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [quizData, responses]);

  if (score === null || totalQuestions === null || questionsWithAnswers.length === 0) {
    return <p>Loading results...</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Quiz Results</h1>
      <p>
        You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong>
      </p>
      <div style={{ marginTop: "20px" }}>
        {questionsWithAnswers.map((question, index) => {
          const userResponse = responses[question.id];
          const correctAnswer = question.correct_answer;
          const userPickedOptionText = userResponse ? question[`option_${userResponse.toLowerCase()}`] : "Not Answered";
          const correctOptionText = correctAnswer ? question[`option_${correctAnswer.toLowerCase()}`] : "N/A";

          return (
            <div
              key={question.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "15px",
                textAlign: "left",
                maxWidth: "500px",
                margin: "10px auto",
              }}
            >
              <p>
                <strong>
                  {index + 1}. {question.text}
                </strong>
              </p>
              <p>
                <strong>Your Answer:</strong> {userPickedOptionText}
              </p>
              <p>
                <strong>Correct Answer:</strong> {correctOptionText}
              </p>
              <p
                style={{
                  color: userResponse === correctAnswer ? "green" : "red",
                }}
              >
                {userResponse === correctAnswer ? "Correct!" : "Incorrect"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultPage;