import { emptyGlobalChatMessages } from '../controllers/database';

// Define cron job configuration object
export const cleanGlobalChat = {
  cronTime: '10 20 11 * * *',
  onTick: emptyGlobalChatMessages,
  timeZone: 'America/New_York',
  start: true, // Start the job automatically
};
