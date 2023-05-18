import { emptyGlobalChatMessages } from '../controllers/database';

export const cleanGlobalChat = {
  cronTime: '0 30 12 * * *',
  onTick: emptyGlobalChatMessages,
  timeZone: 'America/New_York',
  start: true,
};
