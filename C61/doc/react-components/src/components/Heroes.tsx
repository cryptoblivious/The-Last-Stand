import { useState } from 'react';
import Card from  './Card'

interface Hero {
  id: number;
  name: string;
  image: string;
}


const Heroes = () => {
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
  const heroes: Hero[] = [
    {id: 1, name: 'Solana', image: 'https://picsum.photos/200/300'},
    {id: 2, name: 'Logan', image: 'https://picsum.photos/200/300'},
    {id: 3, name: 'chuck doug', image: 'https://picsum.photos/200/300'}
  ];

  const handleHeroClick = (heroId: number) => {
    setSelectedHeroId(heroId);
  };

  return (
    <div className='flex justify-center space-x-4'>
      {heroes.map((hero) => (
        <Card
          key={hero.id}
          card= {{ id: hero.id, reference: hero.name, image: hero.image }}
          isSelected={hero.id === selectedHeroId}
          onClick = {() => handleHeroClick(hero.id)}
          />
      ))}
    </div>
  );
};

export default Heroes;
