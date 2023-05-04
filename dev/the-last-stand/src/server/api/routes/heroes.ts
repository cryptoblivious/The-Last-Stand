import express from 'express';
import { getHeroesNamesAndBackstories, getHeroesNames } from '../controllers/heroes';

const heroesRouter = express.Router();

// GET all heroes names and backstories
heroesRouter.get('/hnabs', getHeroesNamesAndBackstories);

heroesRouter.get('/names', getHeroesNames)

export default heroesRouter;
