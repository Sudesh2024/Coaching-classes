import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = ({ token }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fees, setFees] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/course`,
        {
          name,
          description,
          fees
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Course created successfully');
    } catch (error) {
      alert('Error creating course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Panel - Create Course</h2>
      <div>
        <label>Course Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Fees</label>
        <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} required />
      </div>
      <button type="submit">Create Course</button>
    </form>
  );
};

export default AdminPanel;
