import React, { useState, useEffect } from 'react';
import { getCourses, registerCourse } from '../services/api';

const StudentDashboard = ({ token }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await getCourses();
            setCourses(response.data);
        };
        fetchCourses();
    }, []);

    const handleCourseRegistration = async () => {
        try {
            await registerCourse({ studentId: "student_id_here", courseId: selectedCourse }, token);
            alert('Course registration successful!');
        } catch (error) {
            alert('Error during course registration');
        }
    };

    return (
        <div>
            <h2>Student Dashboard</h2>
            <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
                <option value="">Select a course</option>
                {courses.map(course => (
                    <option key={course._id} value={course._id}>
                        {course.name} - ${course.fees}
                    </option>
                ))}
            </select>
            <button onClick={handleCourseRegistration}>Register for Course</button>
        </div>
    );
};

export default StudentDashboard;
