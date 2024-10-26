// src/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import your database methods

const app = express();
const PORT = 5000;

app.use(cors()); // Allow requests from the front-end server
app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await db.addUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message.includes("Email already exists")) {
      res.status(400).json({ error: error.message });
    } else {
      console.error("Error in /signup:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  }
});

// Endpoint to login a user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await db.getUsers(); // Fetch all users
    const user = users.find((user) => user.uemail === email && user.upassword === password); // Check for matching email and password

    if (user) {
      res.status(200).json({ 
        message: 'Login successful!',
        username: user.uname,
        email: user.uemail
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
});

// Endpoint to delete a user by email
app.delete('/delete', async (req, res) => {
  const { email } = req.body;

  try {
    const deletedUser = await db.deleteUser(email);
    res.status(200).json({ message: `User with email ${email} deleted.` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
});

app.get('/test', (req, res) => {
  res.send("Server is working!");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
