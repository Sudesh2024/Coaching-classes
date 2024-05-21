import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentRegister from './components/StudentRegister';
import StudentLogin from './components/StudentLogin';
import CourseRegistration from './components/CourseRegistration';
import AdminPanel from './components/AdminPanel';
import './App.css'; // Import the CSS file

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/register">Student Register</Link></li>
          <li><Link to="/login">Student Login</Link></li>
          <li><Link to="/register-course">Register for Course</Link></li>
          <li><Link to="/admin">Admin Panel</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/login" element={<StudentLogin setToken={setToken} />} />
        <Route path="/register-course" element={<CourseRegistration token={token} />} />
        <Route path="/admin" element={<AdminPanel token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;
