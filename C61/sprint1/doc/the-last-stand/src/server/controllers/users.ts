import { userModel } from '../models/user';

// POST a new user
export const createUser = async (req: any, res: any) => {
  const { email, username, userNo, title, lastOnline } = req.body;
  try {
    const user = await userModel.create({
      email,
      username,
      userNo,
      title,
      lastOnline,
    });
    res.status(200).json(user);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// GET all users
export const readUsers = async (req: any, res: any) => {
  try {
    const users = await userModel.find({}).sort({ username: 1 });
    res.status(200).json(users);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// GET one user
export const readUserByEmail = async (req: any, res: any) => {
  try {
    const email = req.params.email;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// PATCH a user
export const updateUserByEmail = async (req: any, res: any) => {
  const email = req.params.email;
  try {
    const user = await userModel.findOneAndUpdate({ email }, { ...req.body }, { new: true });
    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// DELETE a user
export const deleteUserByEmail = async (req: any, res: any) => {
  const email = req.params.email;
  console.log('email', email);
  try {
    const user = await userModel.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// GET current user
export const readCurrentUser = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};
