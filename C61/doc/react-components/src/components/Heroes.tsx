import CardMenu from './CardMenu';


interface Hero {
  id: number;
  name: string;
  image: string;
}
const heroes: Hero[] = [
  { id: 1, name: 'Solana', image: 'https://picsum.photos/200/300' },
  { id: 2, name: 'Logan', image: 'https://picsum.photos/200/300' },
  { id: 3, name: 'chuck doug', image: 'https://picsum.photos/200/300' },
  { id: 4, name: 'Alphonse', image: 'https://picsum.photos/200/300' },
  { id: 5, name: 'Bart', image: 'https://picsum.photos/200/300' },
  
];

const Heroes = () => {

  return (
    <div className='flex justify-center space-x-4'>

      <CardMenu heroes={ heroes } />

    </div>
  );
};

export default Heroes;
