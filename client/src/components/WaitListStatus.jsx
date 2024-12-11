import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WaitListStatus = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", patientId: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${formData.patientId}`);
      if (!response.ok) throw new Error("Error fetching patient.");

      const patient = await response.json();
      const expectedFullName = `${patient.firstName} ${patient.lastName}`;
      if (expectedFullName !== formData.fullName) {
        alert("Name and Patient ID do not match.");
        return;
      }

      alert(`Estimated Wait Time: ${patient.timeWaiting} minutes`);
      navigate("/admin_dashboard"); // Redirect to admin dashboard
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch patient details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Wait List Status</h2>
      <label>Full Name</label>
      <input
        type="text"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      />
      <label>Patient ID</label>
      <input
        type="number"
        value={formData.patientId}
        onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
      />
      <button type="submit">Check Wait Time</button>
    </form>
  );
};

export default WaitListStatus;
