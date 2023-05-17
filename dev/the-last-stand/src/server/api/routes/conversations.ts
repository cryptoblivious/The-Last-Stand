import express from 'express';
import { createGlobalConversation as createGlobalConversation, readConversations, readGlobalConversation, readConversationById, readConversationByUsers as readOrCreateConversationByUsers } from '../controllers/conversations';

const conversationsRouter = express.Router();

// GET all Conversations
conversationsRouter.get('/', readConversations);

// GET the global Conversation
conversationsRouter.get('/global', readGlobalConversation);

// GET one Conversation by id
conversationsRouter.get('/id/:id', readConversationById);

// GET one Conversation depending on the users in the Conversation
conversationsRouter.post('/userIds/:userIds', readOrCreateConversationByUsers);

// POST a new Global Conversation
conversationsRouter.post('/global', createGlobalConversation);

export default conversationsRouter;
