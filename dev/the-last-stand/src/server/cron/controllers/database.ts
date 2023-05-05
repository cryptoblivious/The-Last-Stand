import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { conversationModel as Conversation } from '../../api/models/conversation';
dotenv.config();
const { MONGO_URI } = process.env;

export async function emptyGlobalChatMessages() {
  try {
    const client = new MongoClient(MONGO_URI!);
    await client.connect();
    const globalChat = await Conversation.findOne({ isGlobal: true });
    await Conversation.findOneAndUpdate({ _id: globalChat._id }, { $set: { messages: [] } });
    client.close();
    console.log('global chat messages emptied');
  } catch (err) {
    console.log(err);
  }
}
