# PrepAI – AI-Powered Interview Preparation Platform

PrepAI is an AI-powered interview preparation platform designed to help students and job seekers practice interviews, analyze their performance, improve their resumes, and prepare for technical and company-specific interviews.

The platform combines multiple interview preparation tools into a single application, providing users with practice, evaluation, and performance insights.

---

## 🚀 Features

### 🤖 AI Mock Interview
- Practice technical and HR interview questions.
- Answer questions sequentially.
- Receive performance scores based on answers.
- Review results after completing an interview.

### 🎙️ Voice Interview
- Practice interview questions using voice input.
- Uses browser speech recognition to capture spoken answers.
- Provides a score after completing the interview.
- Helps users improve their verbal interview confidence.

### 📄 Resume Analyzer
- Upload and analyze a resume.
- Reviews important resume sections such as:
  - Skills
  - Projects
  - Education
  - Keywords
- Provides feedback to help improve the resume.

### 💻 Coding Assessment
- Practice programming questions.
- Write code directly in the assessment interface.
- Run solutions against test cases.
- View test-case results.
- Receive an assessment score.

### 🏢 Company Preparation
- Prepare for company-specific interviews.
- Practice HR and technical topics.
- Helps users organize preparation according to their target company.

### 📊 Performance Analytics
- Displays interview performance results.
- Tracks the latest interview score.
- Helps users identify areas that need improvement.
- Encourages continuous practice and improvement.

### 🔐 User Authentication
- User registration and login.
- Firebase Authentication integration.
- Protected dashboard and application modules.

---

## 🛠️ Technology Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

### Authentication & Backend Services
- Firebase Authentication
- Firebase

### Development Tools
- Visual Studio Code
- Git
- GitHub
- npm

---

## 🏗️ Project Structure

```text
PrepAI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   │
│   │   ├── firebase/
│   │   │   └── firebase.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── CodingAssessment/
│   │   │   ├── CompanyPreparation/
│   │   │   ├── Dashboard/
│   │   │   ├── Home/
│   │   │   ├── Interviews/
│   │   │   ├── Login/
│   │   │   ├── Performance/
│   │   │   ├── Register/
│   │   │   └── ResumeAnalyzer/
│   │   │
│   │   └── routes/
│   │       ├── AppRoutes.tsx
│   │       └── ProtectedRoute.tsx
│   │
│   ├── package.json
│   └── .gitignore
│
└── README.md
