import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { conversationModel as Conversation } from '../../api/models/conversation';
dotenv.config();
const { MONGO_URI } = process.env;

export async function emptyGlobalChatMessages() {
  console.log('accessing cron job');

  try {
    const client = new MongoClient(MONGO_URI!);
    await client.connect();
    const globalChat = await Conversation.findOne({ isGlobal: true });
    await Conversation.findOneAndUpdate({ _id: globalChat._id }, { $set: { messages: [] } });
    console.log('global chat messages emptied');
    client.close();
  } catch (err) {
    console.log(err);
  }
}
