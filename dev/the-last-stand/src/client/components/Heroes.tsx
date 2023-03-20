import HeroMapCardMenu from './HeroMapCardMenu';
import { useState } from 'react';
import IHeroMapCard from '../../typescript/interfaces/IHeroMapCard';
import { HOST_URL, HOST_PORT } from '../appConfig';

const heroesPageContainerStyle = 'h-screen grid gap-4 grid-cols-3 grid-rows-5 bg-cover bg-center bg-no-repeat';
const heroesPageTitleContainerStyle = 'col-start-2 col-span-2 row-span-2 flex justify-center items-center w-full h-full bg-black bg-opacity-0';
const heroesPageTitleStyle = 'text-4xl font-bold text-center text-fuchsia-400';
const heroesPageBackstoryContainerStyle = 'row-start-3 col-start-2 row-span-3 col-span-2 flex justify-center items-center bg-black bg-opacity-30 rounded-lg mr-10 overflow-y-auto';
const heroesPageBackstoryStyle = 'text-xl font-bold text-center text-fuchsia-400';
const heroesPageHeroMapCardMenuContainerStyle = 'place-self-center row-start-3';

const heroes: IHeroMapCard[] = [
  { id: 1, name: 'Solana', image: './src/client/assets/heroes/solana/portrait.webp' },
  { id: 2, name: 'Logan', image: './src/client/assets/heroes/logan/portrait.png' },
  { id: 3, name: 'Chuck', image: './src/client/assets/heroes/chuck/portrait.png' },
  { id: 4, name: 'Alphonse', image: 'https://picsum.photos/450/200' },
  { id: 5, name: 'Bart', image: 'https://picsum.photos/300/200' },
];

const backstories: Record<string, string> = {}

const fetchHeroesNamesAndBackstories = async () => {
  const response = await fetch(`${HOST_URL}:${HOST_PORT}/heroes/hnabs`);
  const heroesData = await response.json();
  heroesData.forEach((hero: any) => {
    backstories[hero.name] = hero.backstory;
  })
};
fetchHeroesNamesAndBackstories();

console.log(backstories)

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
