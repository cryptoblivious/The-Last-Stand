//  Nom du fichier : database.ts
//  Contexte : Un fichier de type TypeScript qui permet de gérer les configurations de tâches cron.
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/

import { emptyGlobalChatMessages } from '../controllers/database';

export const cleanGlobalChat = {
  cronTime: '0 40 12 * * *',
  onTick: emptyGlobalChatMessages,
  timeZone: 'America/New_York',
  start: true,
};
