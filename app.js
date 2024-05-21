require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const studentRoutes = require('./routes/student');
const courseRoutes = require('./routes/course');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/admin', adminRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
