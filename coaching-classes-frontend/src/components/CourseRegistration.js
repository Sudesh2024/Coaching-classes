import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseRegistration = ({ token }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses`);
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/students/register-course`,
        {
          token: token,
          courseId: selectedCourse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Course registered successfully');
    } catch (error) {
      alert('Error registering course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Course Registration</h2>
      <div>
        <label>Course</label>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
          <option value="" disabled>Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default CourseRegistration;
