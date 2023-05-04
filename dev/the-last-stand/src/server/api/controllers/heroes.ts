import { HeroModel } from '../models/heroes';

export const getHeroesNamesAndBackstories = async (req: any, res: any) => {
  try {
    const heroes = await HeroModel.find({}, { name: 1, backstory: 1 });
    res.status(200).json(heroes);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};

export const getHeroesNames = async (req: any, res: any) => {
  try {
    const heroes = await HeroModel.find({}, { name: 1 });
    res.status(200).json(heroes);
  } catch (err: any) {
    res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
  }
};
