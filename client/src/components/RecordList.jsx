import React, { useState, useEffect } from "react";
import axios from "axios";

const RecordList = () => {
  const [records, setRecords] = useState([]);

  // Fetch records from the server
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients");
        setRecords(response.data);
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    };

    fetchRecords();
  }, []);

  // Delete a record
  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      setRecords(records.filter((record) => record._id !== id));
      alert("Record deleted successfully!");
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <div>
      <h2>Patient Records</h2>
      <ul>
        {records.map((record) => (
          <li key={record._id}>
            {record.firstName} {record.lastName} - ID: {record.displayId}
            <button onClick={() => deleteRecord(record._id)}>Delete</button>
            <a href={`/modify/${record._id}`}>
              <button>Edit</button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordList;
