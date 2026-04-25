const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initDb = async () => {
  try {
    // Create Artists table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS artists (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(100),
        email VARCHAR(100),
        bio TEXT,
        avatar_url TEXT,
        whatsapp VARCHAR(20),
        instagram VARCHAR(100),
        twitter VARCHAR(100),
        personal_web TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Art Pieces table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS art_pieces (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        price NUMERIC,
        status VARCHAR(20) DEFAULT 'sale', -- 'sale', 'exhibition', 'sold'
        category VARCHAR(50),
        main_image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Art Images table for multiple images per piece
    await pool.query(`
      CREATE TABLE IF NOT EXISTS art_images (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        art_piece_id UUID REFERENCES art_pieces(id) ON DELETE CASCADE,
        image_url TEXT NOT NULL,
        "order" INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database tables initialized successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
};

initDb();
