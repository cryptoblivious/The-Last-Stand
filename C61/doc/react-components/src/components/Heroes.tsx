import CardMenu from './CardMenu';
import { useState } from 'react';

const heroesPageContainerSyle = "flex justify-center space-x-4 bg-cover bg-center bg-no-repeat";

interface Hero {
  id: number;
  name: string;
  image: string;
}
const heroes: Hero[] = [
  { id: 1, name: 'Solana', image: './src/components/solana.webp' },
  { id: 2, name: 'Logan', image: './src/components/logan.png' },
  { id: 3, name: 'chuck doug', image: './src/components/chuckdoug.png' },
  { id: 4, name: 'Alphonse', image: 'https://picsum.photos/450/200' },
  { id: 5, name: 'Bart', image: 'https://picsum.photos/300/200' },
];

const backstories: Record<string, string> = {
  'Solana': 'Solana freakin rocks',
  'Logan': 'Logan is a great guy',
  'chuck doug': 'chuck doug is a sucking asshole guy',
};

const Heroes = () => {
  const [selectedHero, setSelectedHeroName] = useState(heroes[1]);
  const selectedHeroName = selectedHero ? selectedHero.name : 'Unknown Hero';
  const selectedHeroBackstory = backstories[selectedHeroName];
  const backgroundStyle = {
    backgroundImage: `url(${selectedHero ? selectedHero.image : ''})`,
  };
  return (
    <div
      className={heroesPageContainerSyle}
      style={backgroundStyle}>
      <div>
        <h1 className='text-white'> {selectedHeroName}</h1>

      </div>
      <div>
        <p className='text-white'>{selectedHeroBackstory}</p>

      </div>
      <CardMenu
        heroes={heroes}
        onCardClick={(card) => setSelectedHeroName(card)}
      />
    </div>
  );
};

export default Heroes;
