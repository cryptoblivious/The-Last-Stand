import { userModel as User } from '../models/user';
import { roleModel as Role } from '../models/role';

// Verify if user is authenticated
export const isAuthenticated = (req: any, res: any, next: any) => {
  console.log('isAuthenticated returned', req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
    //res.redirect(`http://localhost:${process.env.CLIENT_PORT}/login`);
  }
};

// Verify if user is admin
export const isAdmin = async (req: any, res: any, next: any) => {
  const isAdmin = await Role.findOne({ username: req.user.username, role: 'admin' });

  if (req.isAuthenticated() && isAdmin) {
    return next();
  } else {
    res.redirect('/login');
  }
};

// POST a new user
export const createUser = async (req: any, res: any) => {
  const { email, username, userNo, title, lastOnline } = req.body;
  try {
    const user = await User.create({
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
    const users = await User.find({}).sort({ username: 1 });
    res.status(200).json(users);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// GET one user
export const readUserByEmail = async (req: any, res: any) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
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
    const user = await User.findOneAndUpdate({ email }, { ...req.body }, { new: true });
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
    const user = await User.findOneAndDelete({ email });
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
  // Passport does magic to add the user to the request between the time the request is sent and here.
  console.log('readCurrentUser', req.user);
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    req.user = { username: 'Guest' };
    res.status(200).json(req.user);
    //res.status(404).json({ error: 'Vachier' });
  }
};
