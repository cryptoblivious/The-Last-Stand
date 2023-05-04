import express from 'express';
import { createMessage, deleteMessage, patchMessage, readMessages, readMessage } from '../controllers/messages';

const messagesRouter = express.Router();

// DELETE a message
messagesRouter.delete('/:messageId', deleteMessage);

// GET all messages
messagesRouter.get('/', readMessages);

// GET one message
messagesRouter.get('/:messageId', readMessage);

// UPDATE a message
messagesRouter.patch('/:messageId', patchMessage);

// POST a new message
messagesRouter.post('/', createMessage);

export default messagesRouter;
