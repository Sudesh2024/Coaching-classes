const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: String,
    description: String,
    fees: Number,
});

module.exports = mongoose.model('Course', courseSchema);
