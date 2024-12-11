import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecordList from "./components/RecordList";
import ModifyRecord from "./components/ModifyRecord";

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Patient Management System</h1>
        </header>
        <Routes>
          {/* Route for listing all records */}
          <Route path="/" element={<RecordList />} />
          {/* Route for modifying a specific record */}
          <Route path="/modify/:id" element={<ModifyRecord />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
