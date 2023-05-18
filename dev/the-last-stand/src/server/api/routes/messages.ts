import express from 'express';
import { createMessage, deleteMessage, patchMessage, readMessages, readMessage } from '../controllers/messages';

const messagesRouter = express.Router();

messagesRouter.delete('/:messageId', deleteMessage);

messagesRouter.get('/', readMessages);

messagesRouter.get('/:messageId', readMessage);

messagesRouter.patch('/:messageId', patchMessage);

messagesRouter.post('/', createMessage);

export default messagesRouter;
