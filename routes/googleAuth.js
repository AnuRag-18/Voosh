const express = require('express');
const passport = require('passport');
const { env } = require('process');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CLIENT_ID = "116330656936-m4c5ln5uuffutt20rdldsvhvh3s7j896.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const app = express();

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Use profile information (e.g., profile.id, profile.displayName, etc.) to authenticate or create a user
    return done(null, profile);
}));

// Routes for initiating authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect or respond as needed
        res.redirect('/');
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
