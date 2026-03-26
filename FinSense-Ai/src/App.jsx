import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./pages/Dashboardpage";
import AnalyzeTransaction from "./pages/Analyze";
import PrecisionLedger from "./pages/Cashflowpred";
import FinBotAI from "./pages/FinBot";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path ="/analyze" element ={<AnalyzeTransaction/>}/>
        <Route path="/cashflow" element={<PrecisionLedger/>}/>
        <Route path="/finbot" element={<FinBotAI/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );

}