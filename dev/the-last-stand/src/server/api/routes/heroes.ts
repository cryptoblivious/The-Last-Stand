//  Nom du fichier : scene.ts   
//  Contexte : Route servant de route pour aller chercher le nom et la backstory des héros dans la base de données
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski


import express from 'express';
import { getHeroesNamesAndBackstories, getHeroesNames } from '../controllers/heroes';

const heroesRouter = express.Router();

// GET all heroes names and backstories
heroesRouter.get('/hnabs', getHeroesNamesAndBackstories);

heroesRouter.get('/names', getHeroesNames)

export default heroesRouter;
