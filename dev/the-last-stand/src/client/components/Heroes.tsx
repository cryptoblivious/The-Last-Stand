import HeroMapCardMenu from './HeroMapCardMenu';
import { useState } from 'react';
import IHeroMapCard from '../../typescript/interfaces/IHeroMapCard';


const heroes: IHeroMapCard[] = [
  { id: 1, name: 'Solana', image: './src/client/assets/heroes/solana/portrait.webp' },
  { id: 2, name: 'Logan', image: './src/client/assets/heroes/logan/portrait.png' },
  { id: 3, name: 'chuck doug',  image: './src/client/assets/heroes/chuck/portrait.png' },
  { id: 4, name: 'Alphonse',  image: 'https://picsum.photos/450/200' },
  { id: 5, name: 'Bart', image: 'https://picsum.photos/300/200' },
];

const extractTextData = async (filepath: string): Promise<string> => {
  const response = await fetch(filepath);
  const data = await response.text();
  return data;
};

const backstories: Record<string, string> = {
  'Solana': 'Solana freakin rocks',
  'Logan': 'Logan is a great guy',
  'chuck doug': 'chuck doug is a sucking asshole guy',
  'Alphonse': 'Alphonse is a great guy',
  'Bart': 'Bart is a great guy',
};

// for (const hero of heroes) {
//   const heroName = hero.name;
//   const heroBackstory = await extractTextData(`./src/client/assets/heroes/${hero.foldername}/backstory.txt`);
//   backstories[heroName] = heroBackstory || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et pulvinar orci, ut luctus eros. Aenean elementum leo arcu, sed luctus odio malesuada et. Maecenas sit amet mauris lorem. Morbi sed erat suscipit, laoreet tortor eu, sagittis ex. Sed volutpat, diam non hendrerit imperdiet, lacus odio egestas neque, non commodo sem nisl vitae urna. Nullam tincidunt nisl sed enim venenatis tempor eget eget mi. Praesent ut laoreet velit, in efficitur libero. Vivamus eget justo elementum, pellentesque libero laoreet, sagittis lectus. In vitae ex tortor. Integer justo purus, lobortis lobortis ex vel, congue fringilla dolor. Nulla ac sodales erat. In diam est, condimentum sit amet porttitor sit amet, lacinia vitae augue. Fusce velit risus, porttitor congue ipsum vitae, feugiat sodales justo. Sed sollicitudin erat eget eros facilisis aliquam. Curabitur dolor elit, congue non turpis nec, varius pretium mi. Proin molestie nunc at neque lobortis tempor. Proin sit amet est in velit tincidunt sollicitudin ac vitae ipsum. Praesent eget nisi nunc. Nulla tincidunt eros id sem rhoncus, et ullamcorper sem luctus. Curabitur dictum dolor ipsum, sed rhoncus neque imperdiet quis. Cras sollicitudin erat urna, vel tempus lectus condimentum vitae. Ut sit amet massa blandit, viverra felis a, semper magna. Sed porta vestibulum neque quis feugiat. Quisque tincidunt laoreet tempor. Maecenas sodales eu massa non feugiat. Donec urna nisi, convallis sed nisl ac, vehicula facilisis orci. Mauris hendrerit metus vel sapien porttitor, ac porttitor nisi bibendum. Nunc ultricies mattis nisl quis consequat. Mauris et aliquam nibh. Aenean vitae est a quam tincidunt blandit in vel diam. Nam cursus nibh egestas lorem pellentesque dictum. Quisque posuere metus vehicula, pulvinar arcu et, eleifend risus. Mauris iaculis elit odio, in eleifend augue tincidunt at. Donec commodo, purus nec sagittis semper, justo lorem volutpat felis, non molestie tortor tellus non nisl. Curabitur congue tellus ut velit consequat tempor. Maecenas maximus laoreet dui, et sollicitudin nisi vehicula a.`;
//   console.log(heroBackstory);
// }

const Heroes = () => {
  const [selectedHero, setSelectedHeroName] = useState(heroes[1]);
  const selectedHeroName = selectedHero ? selectedHero.name : 'Unknown Hero';
  const selectedHeroBackstory = backstories[selectedHeroName];
  const backgroundStyle = {
    backgroundImage: `url(${selectedHero ? selectedHero.image : ''})`,
  };

  const handleCardSelected = (card: IHeroMapCard) => {
    setSelectedHeroName(card);
  };

  return (
    <div
      className='flex justify-center space-x-4 bg-cover bg-center bg-no-repeat'
      style={backgroundStyle}>
      <h1 className='text-white'> {selectedHeroName}</h1>
      <p className='text-white'>{selectedHeroBackstory}</p>
      <HeroMapCardMenu
        cardsArray={heroes}
        onCardSelected={handleCardSelected}
      />
    </div>
  );
};

export default Heroes;
