import { HOST_URL, HOST_PORT } from '../appConfig';
import IHeroMapCard from '../../typescript/interfaces/IHeroMapCard';
import { capitalizeFirstLetter } from '../../utils/text_format';
import { gl_GridCardData } from '../components/GameLobbyCard';

// Record of hero names and their portrait images, should be moved to a config file
const heroImages: Record<string, string> = {
  solana: '/assets/heroes/solana/portrait.webp',
  logan: '/assets/heroes/logan/portrait.png',
  chuck: '/assets/heroes/chuck/portrait.png',
};

//  Fetches the names and backstories of all heroes and returns as an array of IHeroMapCard objects and a Record of hero names and backstories
export const fetchHeroesNamesAndBackstories = async (): Promise<{ heroes: IHeroMapCard[]; backstories: Record<string, string> }> => {
  const response = await fetch(`${HOST_URL}:${HOST_PORT}/heroes/hnabs`);
  const heroesData = await response.json();
  const heroes: IHeroMapCard[] = [];
  const backstories: Record<string, string> = {};
  heroesData.forEach((hero: { _id: number; name: string; backstory: string }) => {
    heroes.push({
      id: hero._id,
      name: capitalizeFirstLetter(hero.name),
      image: heroImages[hero.name],
    });
    backstories[hero.name] = hero.backstory;
  });
  return { heroes, backstories };
};

export const fetchHeroesNames = async (): Promise<{ heroes: gl_GridCardData[] }> => {
  const response = await fetch(`${HOST_URL}:${HOST_PORT}/heroes/names`);
  const heroesNames = await response.json();
  const heroes: IHeroMapCard[] = [];
  heroesNames.forEach((hero: { _id: number; name: string }) => {
    heroes.push({
      id: hero._id,
      name: capitalizeFirstLetter(hero.name),
      image: heroImages[hero.name],
    });
  });
  return { heroes };

  
}
