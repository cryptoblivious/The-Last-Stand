import { userModel as User } from '../models/user';
import { findUniqueNumber, formatNumber, unformatNumbers } from '../../../utils/maths';

// Find an available username number
export const findAvailableUsernameNumber = async (username: string) => {
  const usersWithSameName = await User.find({ username: username }).exec();
  const usedNosStrings = usersWithSameName.map((user: any) => user.userNo);
  const usedNosValues = unformatNumbers(usedNosStrings);
  const userNo = formatNumber(findUniqueNumber(usedNosValues, 9999));
  return userNo;
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

// PATCH the current user
export const patchCurrentUser = async (req: any, res: any) => {
  const id = req.user?._id;
  if (!id) {
    return res.status(400).json({ err: 'Invalid user ID' });
  }
  try {
    if (req.body.username) {
      const userWithSameName = await User.findOne({ username: req.body.username });
      const currentUser = await User.findOne({ _id: id }).select('userNo username').exec();
      if (userWithSameName && currentUser.username !== req.body.username) {
        const availableUsernameNo = await findAvailableUsernameNumber(req.body.username);
        if (req.body.userNo === '-1') {
          return res.status(400).json({ err: `No available username number associated with ${req.body.username}` });
        }
        req.body.userNo = availableUsernameNo;
      }
    }
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
}; // improved by ChatGPT

// DELETE a user
export const deleteUserByEmail = async (req: any, res: any) => {
  const email = req.params.email;
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
export const readCurrentUser = (req: any, res: any) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ error: 'User not found.' });
  }
};
