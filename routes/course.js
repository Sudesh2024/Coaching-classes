const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Create a new course
router.post('/create', async (req, res) => {
    try {
        const { name, description, fees } = req.body;
        const course = new Course({ name, description, fees });
        await course.save();
        res.status(201).send('Course created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all courses
router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.status(200).json(courses);
});

module.exports = router;
