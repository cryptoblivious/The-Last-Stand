//  Nom du fichier : scene.ts   
//  Contexte : Route servant de route pour aller chercher le noms des scenes dans la base de données
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski


import express from 'express';
import { getScenesNames } from '../controllers/scenes';

const scenesRouter = express.Router();

// GET all scenes names
scenesRouter.get('/names', getScenesNames);

export default scenesRouter;