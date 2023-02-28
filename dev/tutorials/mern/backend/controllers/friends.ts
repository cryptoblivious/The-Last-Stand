import Friend from '../models/friend';
import mongoose from 'mongoose';

// GET all friends
export const readFriends = async (req: any, res: any) => {
  try {
    const friends = await Friend.find({}).sort({ username: -1 });
    res.status(200).json(friends);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// GET one friend
export const readFriend = async (req: any, res: any) => {
  try {
    const email = req.params.email;
    const friend = await Friend.findOne({ email });
    if (!friend) {
      return res.status(404).json({ err: 'Friend not found' });
    }
    res.status(200).json(friend);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// POST a new friend
export const createFriend = async (req: any, res: any) => {
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
};

// UPDATE a friend

// DELETE a friend
