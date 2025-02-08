require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Test = require('./models/Test');  // Import the Test model

const app = express();

app.use(express.json());  // Middleware to parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// CRUD Routes

// 1. CREATE a new Test item
app.post('/api/test', async (req, res) => {
  try {
    const newTest = new Test(req.body);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2. READ all Test items
app.get('/api/test', async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. UPDATE a Test item
app.put('/api/test/:id', async (req, res) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(200).json(updatedTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. DELETE a Test item
app.delete('/api/test/:id', async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(8001, () => {
  console.log(`Server running on port 8001`);
});
