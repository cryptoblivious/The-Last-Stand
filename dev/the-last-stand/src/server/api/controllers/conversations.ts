import { conversationModel as Conversation } from '../models/conversation';
import mongoose from 'mongoose';

// POST a new conversation
export const createConversation = async (req: any, res: any) => {
  try {
    const isGlobal = req.body.isGlobal || false;
    const userIds = isGlobal ? req.body.userIds?.split(',').map((userId: string) => mongoose.Types.ObjectId(userId)) : [];
    const conversation = await Conversation.create({ isGlobal, userIds });
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

// GET one conversation depending on the users in the conversation
export const readConversationByUsers = async (req: any, res: any) => {
  try {
    const userIds = req.params.userIds.split(',').map((userId: string) => mongoose.Types.ObjectId(userId));
    const conversation = await Conversation.findOne({ users: { $all: userIds } });
    if (!conversation) {
      return res.status(404).json({ err: 'Conversation not found' });
    }
    res.status(200).json(conversation);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};
