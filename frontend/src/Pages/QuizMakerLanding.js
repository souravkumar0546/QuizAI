import React, { useState } from "react";

const QuizMakerLanding = () => {
  const [text, setText] = useState("");
  const [quizLink, setQuizLink] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate a quiz.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/create-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: text }),
      });

      if (response.ok) {
        const data = await response.json();
        const quizId = data.quizId;
        setQuizLink(`http://localhost:3000/quiz/${quizId}`);
      } else {
        alert("Error creating quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>AI Quiz Maker</h1>
      <p>Convert any text into a quiz in seconds!</p>
      <textarea
        placeholder="Paste your text here..."
        rows="6"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "80%",
          maxWidth: "500px",
          marginBottom: "20px",
        }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Generate Quiz
      </button>
      <div style={{ marginTop: "20px" }}>
        {quizLink && (
          <p>
            Your quiz is ready! Access it here:{" "}
            <a href={quizLink} target="_blank" rel="noopener noreferrer">
              {quizLink}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizMakerLanding;