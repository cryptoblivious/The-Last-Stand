import { conversationModel as Conversation } from '../models/conversation';
import mongoose from 'mongoose';
import { userModel as User } from '../models/user';

// POST a new global conversation
export const createGlobalConversation = async (req: any, res: any) => {
  try {
    const name = req.body.name;
    const conversation = await Conversation.create({ isGlobal: true, name });
    res.status(200).json(conversation);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// GET all conversations
export const readConversations = async (req: any, res: any) => {
  try {
    const conversations = await Conversation.find({});
    res.status(200).json(conversations);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

// GET the global conversation
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

// Get one conversation by id
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

// GET one conversation depending on the users in the conversation
export const readConversationByUsers = async (req: any, res: any) => {
  try {
    const deserializedUserIds = JSON.parse(decodeURIComponent(req.params.userIds));
    console.log('deserializedUserIds', deserializedUserIds);
    const conversation = await Conversation.findOne({
      $expr: {
        $setEquals: ['$userIds', deserializedUserIds],
      },
    });
    console.log('conversation', conversation.userIds);
    if (!conversation) {
      // Create a new conversation if it doesn't exist
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
