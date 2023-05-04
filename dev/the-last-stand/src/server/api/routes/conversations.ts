import express from 'express';
import { createConversation, readConversations, readGlobalConversation, readConversationById, readConversationByUsers } from '../controllers/conversations';

const conversationsRouter = express.Router();

// GET all Conversations
conversationsRouter.get('/', readConversations);

// GET the global Conversation
conversationsRouter.get('/global', readGlobalConversation);

// GET one Conversation by id
conversationsRouter.get('/id/:id', readConversationById);

// GET one Conversation depending on the users in the Conversation
conversationsRouter.get('/userIds/:userIds', readConversationByUsers);

// POST a new Conversation
conversationsRouter.post('/', createConversation);

export default conversationsRouter;
