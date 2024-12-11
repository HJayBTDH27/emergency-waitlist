import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [newPatients, setNewPatients] = useState([]);
  const [triagedPatients, setTriagedPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/patients");
        if (!response.ok) throw new Error("Error fetching patients.");

        const patients = await response.json();
        setNewPatients(patients.filter((patient) => !patient.triaged));
        setTriagedPatients(patients.filter((patient) => patient.triaged));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>New Patients</h3>
        <ul>
          {newPatients.map((patient) => (
            <li key={patient.displayId}>
              {patient.firstName} {patient.lastName} - ID: {patient.displayId}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Triaged Patients</h3>
        <ul>
          {triagedPatients.map((patient) => (
            <li key={patient.displayId}>
              {patient.firstName} {patient.lastName} - ID: {patient.displayId}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
