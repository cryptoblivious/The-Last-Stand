//  Nom du fichier : auth.ts
//  Contexte : Un fichier de type TypeScript qui permet de gérer les routes de l'authentification
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

import express from 'express';
import passport from 'passport';
import { isAuth, logoutUser } from '../controllers/auth';
import dotenv from 'dotenv';
dotenv.config();
const { CLIENT_URL, CLIENT_PORT } = process.env;

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { accessType: 'offline', prompt: 'consent', scope: ['profile', 'email'] }));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/home`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
  })
);
authRouter.get('/check', isAuth);
authRouter.delete('/logout', logoutUser);

export default authRouter;
