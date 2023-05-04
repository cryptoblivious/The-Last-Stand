import express from 'express';
import { getScenesNames } from '../controllers/scenes';

const scenesRouter = express.Router();

// GET all scenes names
scenesRouter.get('/names', getScenesNames);

export default scenesRouter;