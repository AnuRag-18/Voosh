
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
app.use(bodyParser.json());
let users = [];
app.post('/api/register', (req, res) => {
    const { username, email, password, userDetails } = req.body;
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }
    const newUser = {
        id: users.length + 1, // Assign a unique ID (you might want to use a more robust method in production)
        username,
        email,
        password,
        userDetails // In production, make sure to hash the password before storing it
    };

    // Add the new user to the array (simulated database)
    users.push(newUser);

    // Respond with the newly created user
    res.status(201).json(newUser);
});

console.log("users", users);
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
});






// Middleware to set up session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));


app.get('/signout', (req, res) => {
    // Clear session data
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect to a signout success page or any other page after signout
            res.status(500).send('User signed out');
        }
    });
});



module.exports = app;