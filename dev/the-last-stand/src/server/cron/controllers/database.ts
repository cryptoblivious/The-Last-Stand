//  Nom du fichier : database.ts
//  Contexte : Un fichier de type TypeScript qui permet de gérer la logique de tâches cron.
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { conversationModel as Conversation } from '../../api/models/conversation';
import { IMessageMapper } from '../../../typescript/interfaces/IMessageMapper';
dotenv.config();
const { MONGO_URI } = process.env;

export async function emptyGlobalChatMessages() {
  try {
    const client = new MongoClient(MONGO_URI!);
    await client.connect();
    const globalChat = await Conversation.findOne({ isGlobal: true });
    const resetMessage = new IMessageMapper();
    resetMessage.content = `Global messages have been reset on ${new Date().toLocaleDateString(undefined, { dateStyle: 'full'})}`;
    resetMessage.userNo = '0000';
    resetMessage.username = 'Server';
    await Conversation.findOneAndUpdate({ _id: globalChat._id }, { $set: { messages: [resetMessage] } });
    client.close();
    console.log('global chat messages emptied');
  } catch (err) {
    console.log(err);
  }
}
