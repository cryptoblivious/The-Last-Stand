//  Nom du fichier : Heroes.tsx
//  Contexte : Composant fonctionnel React servant de page principale de la page héro 
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://react.dev/


import HeroMapCardMenu from './HeroMapCardMenu';
import { useState, useEffect } from 'react';
import IHeroMapCard from '../../typescript/interfaces/IHeroMapCard';
import { fetchHeroesNamesAndBackstories } from '../fetches/heroes';

const heroesPageContainerStyle = 'h-screen grid gap-4 grid-cols-3 grid-rows-5 bg-cover bg-center bg-no-repeat';
const heroesPageTitleContainerStyle = 'col-start-2 col-span-2 row-span-2 flex justify-center items-center w-full h-full bg-opacity-0';
const heroesPageTitleStyle = 'text-4xl font-bold text-center text-fuchsia-400';
const heroesPageBackstoryContainerStyle = 'row-start-3 col-start-2 row-span-3 col-span-2 flex justify-center items-center bg-opacity-30 rounded-lg mr-10 overflow-y-auto';
const heroesPageBackstoryStyle = 'text-xl font-bold text-center text-fuchsia-400 overflow-auto h-64 w-full bg-black bg-opacity-50 rounded-lg p-4';
const heroesPageHeroMapCardMenuContainerStyle = 'place-self-center row-start-3';


const Heroes = () => {

  // initialize states
  const [heroes, setHeroes] = useState<IHeroMapCard[]>([]);
  const [backstories, setBackstories] = useState<Record<string, string>>({});
  const [selectedHero, setSelectedHero] = useState<IHeroMapCard | null>(null);

  // fetch heroes and backstories from server on component mount
  useEffect(() => {
    fetchHeroesNamesAndBackstories().then(({ heroes, backstories }) => {
      setHeroes(heroes);
      setBackstories(backstories);
    })
  }, []);

  // set selected hero to first hero in heroes array once heroes are fetched
  useEffect(() => {
    if (heroes.length > 0) {
      setSelectedHero(heroes[1]);
    }
  }, [heroes]);

  // return loading if heroes or backstories are not fetched
  if (!selectedHero) {
    return <div>Loading...</div>;
  }

  // set background image to selected hero's image 
  const selectedHeroName = selectedHero ? selectedHero.name : 'Unknown Hero';
  const selectedHeroBackstory = backstories[selectedHeroName.toLowerCase()];
  const backgroundStyle = {
    backgroundImage: `url(${selectedHero ? selectedHero.image : ''})`,
  };

  // callback function for when a card is selected in the HeroMapCardMenu
  const handleCardSelected = (card: IHeroMapCard) => {
    setSelectedHero(card);
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
