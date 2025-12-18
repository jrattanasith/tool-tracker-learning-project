import express from 'express';
import db from '../db.js'; // your Pool connection
const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM items ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST: create new item
router.post('/', async (req, res) => {
  const { name, category, quantity, drawer, bin } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO items (name, category, quantity, drawer, bin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, category, quantity, drawer, bin]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB Insert Error:', err);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// PUT: update an existing item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, drawer, bin } = req.body;
  try {
    const result = await db.query(
      'UPDATE items SET name=$1, category=$2, quantity=$3, drawer=$4, bin=$5 WHERE id=$6 RETURNING *',
      [name, category, quantity, drawer, bin, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB Update Error:', err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE: remove item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'DELETE FROM items WHERE id=$1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB Delete Error:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

export default router;
