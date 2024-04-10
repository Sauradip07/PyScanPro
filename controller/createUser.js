// Import necessary modules
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model is defined in a separate file

// POST route to create a new user
router.post('/', async (req, res) => {
    try {
        // Extract data from request body
        const { roll_no, name, year, subjects } = req.body;

        // Validate input (you can use a library like Joi for more robust validation)
        if (!roll_no || !name || !year || !subjects) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        // Create new user instance
        const newUser = new User({
            roll_no,
            name,
            year,
            subjects
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with the saved user object
        res.status(201).json(savedUser);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
