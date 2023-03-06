import { playerModel as Player } from '../models/player';

// POST a new player
export const createPlayer = async (req: any, res: any) => {
  const { email, username, userNo, title, avatar, isOnline, lastOnline } = req.body;
  try {
    const player = await Player.create({
      email,
      username,
      userNo,
      title,
      avatar,
      isOnline,
      lastOnline,
    });
    res.status(200).json(player);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// GET all players
export const readPlayers = async (req: any, res: any) => {
  try {
    const players = await Player.find({}).sort({ username: -1 });
    res.status(200).json(players);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// GET one player
export const readPlayerByEmail = async (req: any, res: any) => {
  try {
    const email = req.params.email;
    const player = await Player.findOne({ email });
    if (!player) {
      return res.status(404).json({ err: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// PATCH a player
export const updatePlayerByEmail = async (req: any, res: any) => {
  const email = req.params.email;
  try {
    const player = await Player.findOneAndUpdate({ email }, { ...req.body }, { new: true });
    if (!player) {
      return res.status(404).json({ err: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// DELETE a player
export const deletePlayerByEmail = async (req: any, res: any) => {
  const email = req.params.email;
  console.log('email', email);
  try {
    const player = await Player.findOneAndDelete({ email });
    if (!player) {
      return res.status(404).json({ err: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};
