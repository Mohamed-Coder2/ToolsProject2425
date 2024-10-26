// src/back-end/db.js
const { Client } = require('pg');

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "100603",
  database: "ToolsProject"
});

client.connect();

// Define the addUser function to insert a new user into the database
const addUser = async (name, email, password) => {
  try {
    const queryText = `
      INSERT INTO public."User" (uname, uemail, upassword)
      VALUES ($1, $2, $3)
      RETURNING *;`;
    const values = [name, email, password];

    const res = await client.query(queryText, values);
    console.log("User added:", res.rows[0]);
    return res.rows[0]; // Return the added user
  } catch (err) {
    if (err.code === '23505') {  // Unique violation error code
      throw new Error("Email already exists. Please use a different email.");
    }
    else {
      console.error("Error adding user:", err.message);
    }
    throw err;
  }
};

const deleteUser = async (email) => {
  try {
    const queryText = `DELETE FROM public."User" WHERE uemail = $1 RETURNING *;`;
    const values = [email];

    const res = await client.query(queryText, values);
    if (res.rowCount === 0) {
      throw new Error('No user found with that email.');
    }
    console.log("User deleted:", res.rows[0]);
    return res.rows[0]; // Return the deleted user
  } catch (err) {
    console.error("Error deleting user:", err.message);
    throw err;
  }
};

// Example query to retrieve users (optional)
const getUsers = async () => {
  try {
    const res = await client.query(`SELECT * FROM public."User" ORDER BY uid ASC`);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving users:", err.message);
    throw err;
  }
};

module.exports = { addUser, getUsers };
