const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
console.log("DEBUG: Callback URL is:", process.env.GOOGLE_URL)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // If not, create new user
        user = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });

        await user.save();
        done(null, user);
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }
  )
);