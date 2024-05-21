import React, { useState } from 'react';
import axios from 'axios';

const StudentRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_API_URL)
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/students/register`, {
        name,
        email,
        password,
      });
      alert('Student registered successfully');
    } catch (error) {
      console.error('Error:', error); // Debug log
      alert('Error registering student');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Registration</h2>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default StudentRegister;
