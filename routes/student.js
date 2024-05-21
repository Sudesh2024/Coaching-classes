const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Course = require('../models/Course');

const router = express.Router();

// Student Registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = new Student({ name, email, password: hashedPassword });
        await student.save();
        res.status(201).send('Student registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Student Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
        return res.status(400).send('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
        return res.status(400).send('Invalid email or password');
    }
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
});

// Register for a course
router.post('/register-course', async (req, res) => {
    const { token, courseId } = req.body;
    let studentId = jwt.verify(token, process.env.JWT_SECRET).id;
    console.log(studentId)
    const student = await Student.findById(studentId);
    console.log(student)
    const course = await Course.findById(courseId);

    console.log(student)

    if (!student || !course) {
        return res.status(404).send('Student or Course not found');
    }
    student.registeredCourses.push(course);
    await student.save();
    res.status(200).send('Course registered successfully');
});

module.exports = router;
