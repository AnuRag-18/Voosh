const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
let users = [];
app.use(bodyParser.json());


app.get('/api/users', (req, res) => {
    res.json(users);
});


app.post('/api/user', (req, res) => {
    const { userDetails } = req.body;
    const newUser = { id: users.length + 1, userDetails };
    users.push(newUser);
    res.status(201).json(newUser);
});


app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
});

app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { userDetails } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        users[userIndex] = { ...userIndex[userIndex], userDetails };
        res.json(users[userIndex]);
    }
});

app.get('/api/users/:userType', (req, res) => {
    const userType = req.params.userType;
    if (userType === "admin") {
        res.status(200).json(users);
    }
    else {
        const data = users.map((user) => {
            return user.userDetails.profile === "private";
        })
        res.status(200).json(data);
    }

})
app.get('/api/users/normal', (req, res) => {
    res.status
})

module.exports = app;
