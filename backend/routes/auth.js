// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { fullName, email, password, confirmPassword, monthlyBudget, preferredCurrency, notificationPref } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      fullName,
      email,
      password: hashedPassword,
      monthlyBudget,
      preferredCurrency,
      notificationPref,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Login Route
// routes/auth.js
router.post('/login', async (req, res) => {
  console.log('called login endpoint');
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      // Generate JWT token
      const payload = {
        user: { id: user._id },
      };
  
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            monthlyBudget: user.monthlyBudget,
            preferredCurrency: user.preferredCurrency,
          },
        });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
