const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Course = require('../models/Course');

const router = express.Router();

// Admin Registration
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ username, password: hashedPassword });
        await admin.save();
        res.status(201).send('Admin registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Admin Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
        return res.status(400).send('Invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return res.status(400).send('Invalid username or password');
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
});

// Create or update course (admin only)
router.post('/course', async (req, res) => {
    const { id, name, description, fees } = req.body;
    let course;
    if (id) {
        course = await Course.findById(id);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        course.name = name;
        course.description = description;
        course.fees = fees;
        await course.save();
        res.status(200).send('Course updated successfully');
    } else {
        course = new Course({ name, description, fees });
        await course.save();
        res.status(201).send('Course created successfully');
    }
});

module.exports = router;
