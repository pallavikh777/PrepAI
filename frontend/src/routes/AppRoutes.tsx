import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Interview from "../pages/Interviews/Interview";
import Performance from "../pages/Performance/Performance";
import ResumeAnalyzer from "../pages/ResumeAnalyzer/ResumeAnalyzer";
import VoiceInterview from "../pages/Interviews/VoiceInterview";
import CompanyPreparation from "../pages/CompanyPreparation/CompanyPreparation";
import CodingAssessment from "../pages/CodingAssessment/CodingAssessment";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/interview"
  element={
    <ProtectedRoute>
      <Interview />
    </ProtectedRoute>
  }
/>
<Route
  path="/performance"
  element={
    <ProtectedRoute>
      <Performance />
    </ProtectedRoute>
  }
/>
<Route
  path="/resume-analyzer"
  element={
    <ProtectedRoute>
      <ResumeAnalyzer />
    </ProtectedRoute>
  }
/>
<Route
  path="/voice-interview"
  element={
    <ProtectedRoute>
      <VoiceInterview />
    </ProtectedRoute>
  }
/>
<Route
  path="/company-preparation"
  element={
    <ProtectedRoute>
      <CompanyPreparation />
    </ProtectedRoute>
  }
/>
<Route
  path="/coding-assessment"
  element={
    <ProtectedRoute>
      <CodingAssessment />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;