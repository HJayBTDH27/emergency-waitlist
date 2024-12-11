import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ModifyRecord = () => {
  const { id } = useParams(); // Get the record ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    pronouns: "",
    biologicalSex: "",
    conditionCode: [],
    painLevel: "",
  });

  // Fetch record details
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching record:", err);
      }
    };

    fetchRecord();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/patients/${id}`, formData);
      alert("Record updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating record:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Modify Record</h2>
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
      <label>Biological Sex</label>
      <select
        value={formData.biologicalSex}
        onChange={(e) => setFormData({ ...formData, biologicalSex: e.target.value })}
      >
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
      <label>Condition Code</label>
      <input
        type="text"
        value={formData.conditionCode}
        onChange={(e) => setFormData({ ...formData, conditionCode: e.target.value.split(",") })}
      />
      <label>Pain Level</label>
      <input
        type="number"
        value={formData.painLevel}
        onChange={(e) => setFormData({ ...formData, painLevel: e.target.value })}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ModifyRecord;
