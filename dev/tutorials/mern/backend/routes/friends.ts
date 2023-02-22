import express from 'express';

const router = express.Router();

// GET all friends
router.get('/', (req, res) => {
  res.json({ msg: 'GET all friends' });
});

// GET one friend
router.get('/:id', (req, res) => {
  res.json({ msg: 'GET one friend' });
});

// POST a new friend
router.post('/', (req, res) => {
  res.json({ msg: 'POST a new friend' });
});

// UPDATE a friend
router.patch('/:id', (req, res) => {
  res.json({ msg: 'UPDATE a friend' });
});

// DELETE a friend
router.delete('/:id', (req, res) => {
  res.json({ msg: 'DELETE a friend' });
});

export default router;
