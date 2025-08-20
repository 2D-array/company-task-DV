const express = require('express');
const router = express.Router();
const { getAllData, getFilteredData, getUniqueValues } = require('../controllers/dataController');

// Get all data
router.get('/', getAllData);

// Get filtered data
router.get('/filtered', getFilteredData);

// Get unique values for a specific column
router.get('/unique/:column', getUniqueValues);

module.exports = router;