// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    
  try {
      const { uname, mail, pass } = req.body;
      console.log(uname);
      console.log(mail);
      console.log(pass);
    const user = new User({ username:uname,email:mail, password:pass });
        console.log("i am good");
        
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Find the user by email and check password
    const user = await User.findOne({ email:email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    // Respond with token and user info
    res.json({
      token,
      user: {
        email: user.email,
        username: user.username,
      },
    });
  });

module.exports = router;
