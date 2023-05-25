//  Nom du fichier : conversations.ts
//  Contexte : Un fichier de type TypeScript qui permet de gérer la logique des conversations dans la base de données
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

import { conversationModel as Conversation } from '../models/conversation';
import { userModel as User } from '../models/user';

export const createGlobalConversation = async (req: any, res: any) => {
  try {
    const name = req.body.name;
    const conversation = await Conversation.create({ isGlobal: true, name });
    res.status(200).json(conversation);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

export const readConversations = async (req: any, res: any) => {
  try {
    const conversations = await Conversation.find({});
    res.status(200).json(conversations);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

export const readGlobalConversation = async (req: any, res: any) => {
  try {
    const conversation = await Conversation.findOne({ isGlobal: true });
    if (!conversation) {
      return res.status(404).json({ err: 'Conversation not found' });
    }
    res.status(200).json(conversation);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

export const readConversationById = async (req: any, res: any) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ err: 'Conversation not found' });
    }
    res.status(200).json(conversation);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

export const readConversationByUsers = async (req: any, res: any) => {
  try {
    const deserializedUserIds = JSON.parse(decodeURIComponent(req.params.userIds));
    const conversation = await Conversation.findOne({
      $expr: {
        $setEquals: ['$userIds', deserializedUserIds],
      },
    });
    if (!conversation) {
      const users = deserializedUserIds.map(async (userId: string) => {
        const user = await User.findById(userId);
        return user;
      });
      const resolvedUsers = await Promise.all(users);
      const newConversation = await Conversation.create({ userIds: deserializedUserIds, name: `${resolvedUsers.map((user: any) => user.username).join(' and ')}'s Chat ` });
      await newConversation.save();
      return res.status(200).json(newConversation);
    }
    res.status(200).json(conversation);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

export const updateUserConversations = async (user: any) => {
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
