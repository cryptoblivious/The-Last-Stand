import HeroMapCardMenu from './HeroMapCardMenu';
import { useState } from 'react';
import IHeroMapCard from '../../typescript/interfaces/IHeroMapCard';
import { HOST_URL, HOST_PORT } from '../appConfig';
import { capirtalizeFirstLetter } from '../../utils/text_format';

const heroesPageContainerStyle = 'h-screen grid gap-4 grid-cols-3 grid-rows-5 bg-cover bg-center bg-no-repeat';
const heroesPageTitleContainerStyle = 'col-start-2 col-span-2 row-span-2 flex justify-center items-center w-full h-full bg-black bg-opacity-0';
const heroesPageTitleStyle = 'text-4xl font-bold text-center text-fuchsia-400';
const heroesPageBackstoryContainerStyle = 'row-start-3 col-start-2 row-span-3 col-span-2 flex justify-center items-center bg-black bg-opacity-50 rounded-lg mr-10 overflow-y-auto';
const heroesPageBackstoryStyle = 'text-xl font-bold text-center text-fuchsia-400';
const heroesPageHeroMapCardMenuContainerStyle = 'place-self-center row-start-3';

const heroImages: Record<string, string> = {
  solana: './src/client/assets/heroes/solana/portrait.webp',
  logan: './src/client/assets/heroes/logan/portrait.png',
  chuck: './src/client/assets/heroes/chuck/portrait.png',
};

// variable to store the heroes data
const heroes: IHeroMapCard[] = [];
const backstories: Record<string, string> = {}

// fetch data and populate the heroes array and the backstories Record
const fetchHeroesNamesAndBackstories = async () => {
  const response = await fetch(`${HOST_URL}:${HOST_PORT}/heroes/hnabs`);
  const heroesData = await response.json();
  heroesData.forEach((hero: any) => {
    backstories[hero.name] = hero.backstory;
    heroes.push({ id: hero._id, name: capirtalizeFirstLetter(hero.name), image: heroImages[hero.name] });
  })
};
fetchHeroesNamesAndBackstories();

const Heroes = () => {
  const [selectedHero, setSelectedHeroName] = useState(heroes[1]);
  const selectedHeroName = selectedHero ? selectedHero.name : 'Unknown Hero';
  const selectedHeroBackstory = backstories[selectedHeroName.toLowerCase()];
  const backgroundStyle = {
    backgroundImage: `url(${selectedHero ? selectedHero.image : ''})`,
  };

  const handleCardSelected = (card: IHeroMapCard) => {
    setSelectedHeroName(card);
  };

  return (
    <div
      className={heroesPageContainerStyle}
      style={backgroundStyle}>
      <div className={heroesPageHeroMapCardMenuContainerStyle}>
        <HeroMapCardMenu
          cardsArray={heroes}
          onCardSelected={handleCardSelected}
        />
      </div>
      <div className={heroesPageTitleContainerStyle}>
        <h1 className={heroesPageTitleStyle}> {selectedHeroName}</h1>
      </div>
      <div className={heroesPageBackstoryContainerStyle}>
        <p className={heroesPageBackstoryStyle}>{selectedHeroBackstory}</p>
      </div>
    </div>
  );
};

export default Heroes;

//ref : chatgpt, copilot