import { emptyGlobalChatMessages } from '../controllers/database';

// Define cron job configuration object
export const cleanGlobalChat = {
  cronTime: '0 0 14 * * *',
  onTick: emptyGlobalChatMessages,
  timeZone: 'America/New_York',
  start: true, // Start the job automatically
};