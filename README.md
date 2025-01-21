# QuizAI

QuizAI is an AI-powered quiz generation platform that allows users to create and take quizzes with AI-generated questions. The project consists of a backend built with Node.js, Express, and Sequelize, and a frontend developed using React.

## Features

- AI-generated quizzes using the Gemini API
- Quiz creation and management
- Real-time quiz results calculation
- User-friendly interface for taking quizzes

## Local Setup Instructions

1. Clone the Repository
```bash
git clone https://github.com/souravkumar0546/QuizAI.git
cd QuizAI
```

2. Create a PostgreSQL Database

Before setting up the environment variables, ensure you have a PostgreSQL database created. You can do this using a PostgreSQL client or command line:

- Connect to your PostgreSQL server.
- Create a new database for the project.

3. Setting Up Environment Variables

Create a .env file in the backend directory and copy the contents from .env.example. Update the variables with your actual credentials:
```env
GEMINI_API_KEY=YourGeminiApiKey
DB_NAME=YourDbName
DB_USER=YourDbUserName
DB_PASSWORD=YourDbPassword
DB_HOST=YourDbHost
```

4. Backend Setup

Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Start the backend server:
```bash
node index.js
```

5. Frontend Setup

Navigate to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend application:
```bash
npm start
```
