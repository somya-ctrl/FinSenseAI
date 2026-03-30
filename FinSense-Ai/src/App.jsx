import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./pages/Dashboardpage";
import AnalyzeTransaction from "./pages/Analyze";
import CashFlowForecast  from "./pages/Cashflowpred";
import FinBotAI from "./pages/FinBot";
import NewEntry from "./pages/Newentry";
import HelpSupport from "./pages/Help";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analyze" element={<AnalyzeTransaction />} />
        <Route path="/cash-flow" element={<CashFlowForecast />} />
        <Route path="/finbot" element={<FinBotAI />} />
        <Route path="/new-entry" element={<NewEntry />} />
        <Route path="/reports" element={<DashboardPage />} />
        <Route path="/help" element={<HelpSupport/>} />
        <Route path="/signout" element={<LandingPage />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}