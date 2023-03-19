import express from "express";
import { getHeroesNamesAndBackstories } from "../controllers/heroes";

const heroesRouter = express.Router();

// GET all heroes names and backstories
heroesRouter.get("/hnabs", getHeroesNamesAndBackstories);

export default heroesRouter;