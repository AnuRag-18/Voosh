// Import required modules
const registerNewUser = require('./routes/registerNewUser');
const userCrud = require('./routes/userCrud');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(registerNewUser);
app.use(userCrud);
app.get('/', (req, res) => {
    res.send('Hello, this is the backend server!');
});

app.post('/api/data', (req, res) => {
    const dataReceived = req.body;
    console.log('Data received:', dataReceived);
    res.send('Data received successfully!');
});

app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ userId, username: 'JohnDoe', email: 'john@example.com' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
