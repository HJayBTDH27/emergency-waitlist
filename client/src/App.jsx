import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientRegistration from "./components/PatientRegistration";
import WaitListStatus from "./components/WaitListStatus";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientRegistration />} />
        <Route path="/wait_list_status" element={<WaitListStatus />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
