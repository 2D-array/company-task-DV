const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dataRoutes = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/data', dataRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Dashboard API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});