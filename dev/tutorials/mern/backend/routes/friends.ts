import express from 'express';

import Friend from '../models/friend';

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
router.post('/', async (req, res) => {
  const { email, username, title, avatar, isOnline, lastOnline } = req.body;

  try {
    const friend = await Friend.create({
      email,
      username,
      title,
      avatar,
      isOnline,
      lastOnline,
    });
    res.status(200).json(friend);
    res.json({ msg: 'Friend added' });
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
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
