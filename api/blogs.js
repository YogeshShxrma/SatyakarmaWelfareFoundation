
/**
 * Minimal Express API route for fetching blogs from PlanetScale.
 * NOTE: This must run in a secure Node.js environment (not in-browser or via client-side React!)
 */

const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

const DB_CONFIG = {
  host: process.env.PLANETSCALE_HOST, // e.g. 'aws.connect.psdb.cloud'
  user: process.env.PLANETSCALE_USERNAME, // e.g. 'abc123'
  password: process.env.PLANETSCALE_PASSWORD,
  database: process.env.PLANETSCALE_DATABASE, // e.g. 'production'
  ssl: { rejectUnauthorized: true }
};

app.get('/api/blogs', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.execute('SELECT * FROM blogs ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs', details: err.message });
  } finally {
    if (connection) await connection.end();
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
