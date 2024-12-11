import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pronouns: "she/her",
    age: "",
    biologicalSex: "female",
    conditionCode: [],
    conditionType: "",
    painLevel: 1,
    medicalHistory: "",
    currentConditions: "",
    currentMedications: "",
    allergies: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error registering patient.");

      const { displayId } = await response.json();
      alert(`Your Patient ID is ${displayId}`);
      navigate("/wait_list_status"); // Redirect to wait list page
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register the patient.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Patient Registration</h2>
      <label>First Name</label>
      <input
        type="text"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
      <label>Last Name</label>
      <input
        type="text"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      <label>Age</label>
      <input
        type="number"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />
      <label>Pronouns</label>
      <select
        value={formData.pronouns}
        onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
      >
        <option value="she/her">She/Her</option>
        <option value="he/him">He/Him</option>
        <option value="they/them">They/Them</option>
        <option value="xie/hir">Xie/Hir</option>
        <option value="prefer-not-to-specify">Prefer Not to Specify</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default PatientRegistration;
