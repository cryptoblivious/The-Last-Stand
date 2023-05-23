//  Nom du fichier : users.ts
//  Contexte : Un fichier de type TypeScript qui permet de gérer les routes des usagers
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

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
