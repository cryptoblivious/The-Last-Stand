import express from 'express';
import { createUser, deleteUserByEmail, patchCurrentUser, readUsers, readUserByEmail, readCurrentUser } from '../controllers/users';

const usersRouter = express.Router();

usersRouter.delete('/:email', deleteUserByEmail);
usersRouter.get('/current', readCurrentUser);
usersRouter.get('/', readUsers);
usersRouter.get('/:email', readUserByEmail);
usersRouter.patch('/:email', patchCurrentUser);
usersRouter.post('/', createUser);
usersRouter.patch('/current', patchCurrentUser);

export default usersRouter;
