const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// --- AUTH ROUTES ---

// Register
app.post('/api/auth/register', async (e, res) => {
  const { username, password, full_name, email } = e.body;

  try {
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM artists WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert artist
    const newArtist = await pool.query(
      'INSERT INTO artists (username, password, full_name, email) VALUES ($1, $2, $3, $4) RETURNING id, username, full_name',
      [username, hashedPassword, full_name, email]
    );

    const token = jwt.sign({ id: newArtist.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: newArtist.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login
app.post('/api/auth/login', async (e, res) => {
  const { username, password } = e.body;

  try {
    const artist = await pool.query('SELECT * FROM artists WHERE username = $1 OR email = $1', [username]);
    
    if (artist.rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, artist.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: artist.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: {
        id: artist.rows[0].id,
        username: artist.rows[0].username,
        full_name: artist.rows[0].full_name
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
