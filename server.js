require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Import Passport config
require('./config/passport'); 

const axios = require("axios");
const app = express();
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// --- ROUTES ---

const { OAuth2Client } = require('google-auth-library');
// Use the Web Client ID from your .env
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('./models/User');

app.get('/auth/google', async (req, res) => {
  const { idToken } = req.query;

  if (!idToken) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token with Google's servers
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // CRITICAL: Must match your Android Client ID's audience
    });
    
    const payload = ticket.getPayload();
    const googleId = payload['sub']; // Unique ID for the user
    const email = payload['email'];
    const name = payload['name'];

    // Find or Create user in MongoDB
    let user = await User.findOne({ googleId: googleId });
    if (!user) {
      user = new User({
        googleId: googleId,
        username: name,
        email: email
      });
      await user.save();
    }

    // Generate YOUR backend's JWT for the app to use
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '48h' }
    );

    res.json({ token: token });

  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: 'Invalid Google Token' });
  }
});

// 2. Google Callback
app.get('/auth/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // At this point, User is authenticated and stored in req.user
    
    // Generate JWT
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '48h' }
    );
    res.json({
      token: token 
    });
  }
);

// 3. Protected Route (Middleware Example)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

app.get('/user/profile', verifyToken, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});