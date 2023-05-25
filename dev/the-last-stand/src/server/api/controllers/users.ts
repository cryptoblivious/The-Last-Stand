//  Nom du fichier : users.ts
//  Contexte : Un fichier de type TypeScript qui permet de gérer la logique des usagers dans la base de données
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

import { userModel as User } from '../models/user';
import { conversationModel as Conversation } from '../models/conversation';
import { findUniqueNumber, formatNumber, unformatNumbers } from '../../../utils/maths/maths';

export const findAvailableUsernameNumber = async (username: string) => {
  const usersWithSameName = await User.find({ username: username }).exec();
  const usedNosStrings = usersWithSameName.map((user: any) => user.userNo);
  const usedNosValues = unformatNumbers(usedNosStrings);
  const userNo = formatNumber(findUniqueNumber(usedNosValues, 9999));
  return userNo;
};

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

export const readUsers = async (req: any, res: any) => {
  try {
    const users = await User.find({}).sort({ username: 1 });
    res.status(200).json(users);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

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

export const patchCurrentUser = async (req: any, res: any) => {
  const updateUserConversations = async (user: any) => {
    const userConversations = await Conversation.find({
      $or: [{ userIds: user._id }, { isGlobal: true }],
    });
    userConversations.forEach(async (conversation: any) => {
      const users = conversation.userIds.map(async (userId: string) => {
        const user = await User.findById(userId);
        return user;
      });
      const resolvedUsers = await Promise.all(users);
      const updatedNames: string[] = resolvedUsers.map((resolvedUser: any) => {
        if (resolvedUser._id.toString() === user._id.toString()) {
          return user.username;
        } else {
          return resolvedUser.username;
        }
      });
      const updatedName = !conversation.isGlobal ? `${updatedNames.join(' and ')}'s Chat` : conversation.name;
      const updatedMessages = conversation.messages.map((message: any) => {
        if (message.userId === user._id.toString()) {
          message.username = user.username;
          message.userNo = user.userNo;
        }
        return message;
      });
      try {
        await Conversation.findByIdAndUpdate(conversation._id, { messages: updatedMessages, name: updatedName });
      } catch (err: any) {
        console.log('err', err);
      }
    });
  };

  const id = req.user?._id;
  if (!id) {
    return res.status(400).json({ err: 'Invalid user ID' });
  }
  try {
    if (req.body.username) {
      const userWithSameName = await User.findOne({ username: req.body.username });
      if (userWithSameName && id !== userWithSameName._id.toString()) {
        const availableUsernameNo = await findAvailableUsernameNumber(req.body.username);
        if (availableUsernameNo === '-1') {
          return res.status(400).json({ err: `No available username number associated with ${req.body.username}` });
        }
        req.body.userNo = availableUsernameNo;
      } else {
        req.body.userNo = '0000';
      }
    }
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }
    await updateUserConversations(user);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

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

export const readCurrentUser = (req: any, res: any) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ error: 'User not found.' });
  }
};
