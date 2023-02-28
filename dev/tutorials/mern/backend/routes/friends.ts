import express from 'express';
import { createFriend, getFriends, getFriend } from '../controllers/friends';

const router = express.Router();

// GET all friends
router.get('/', getFriends);

// GET one friend
router.get('/:email', getFriend);

// POST a new friend
router.post('/', createFriend);

// UPDATE a friend
router.patch('/:id', (req, res) => {
  res.json({ msg: 'UPDATE a friend' });
});

// DELETE a friend
router.delete('/:id', (req, res) => {
  res.json({ msg: 'DELETE a friend' });
});

export default router;
