QuizAI

QuizAI is an AI-powered quiz generation platform that allows users to create and take quizzes with AI-generated questions. The project consists of a backend built with Node.js, Express, and Sequelize, and a frontend developed using React.

Features

- AI-generated quizzes using the Gemini API
- Quiz creation and management
- Real-time quiz results calculation
- User-friendly interface for taking quizzes

Local Setup Instructions

1. Clone the Repository

git clone https://github.com/souravkumar0546/QuizAI.git
cd QuizAI

2. Setting Up Environment Variables

Create a .env file in the backend directory and copy the contents from .env.example. Update the variables with your actual credentials:

GEMINI_API_KEY=YourGeminiApiKey
DB_NAME=YourDbName
DB_USER=YourDbUserName
DB_PASSWORD=YourDbPassword
DB_HOST=YourDbHost

3. Backend Setup

Navigate to the backend folder and install dependencies:

cd backend
npm install

Start the backend server:

node index.js

4. Frontend Setup

Navigate to the frontend folder and install dependencies:

cd ../frontend
npm install

Start the frontend application:

npm start

Contributing

Feel free to submit issues, feature requests, or pull requests. Let’s build an awesome quiz AI together!

License

This project is open-source and available under the MIT License.