import express from 'express';
import { createGlobalConversation as createGlobalConversation, readConversations, readGlobalConversation, readConversationById, readConversationByUsers as readOrCreateConversationByUsers } from '../controllers/conversations';

const conversationsRouter = express.Router();

conversationsRouter.get('/', readConversations);
conversationsRouter.get('/global', readGlobalConversation);
conversationsRouter.get('/id/:id', readConversationById);
conversationsRouter.post('/userIds/:userIds', readOrCreateConversationByUsers);
conversationsRouter.post('/global', createGlobalConversation);

export default conversationsRouter;
