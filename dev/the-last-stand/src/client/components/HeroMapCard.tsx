import IHeroMapCard from '../../typescript/interfaces/IHeroMapCard';

const heroMapCardCSS = 'bg-cover bg-center bg-no-repeat rounded-lg cursor-pointer overflow-hidden shadow-md flex justify-center items-center hover:scale-110 transition-all durantion-500 ease-in-out';
const selectedCardCSS = 'border-2 border-blue-500';
const cardTextCSS = 'text-2xl text-white text-center bg-transparent font-extra-bold';

interface IHeroMapCardProps {
  card: IHeroMapCard;
  isSelected: boolean;
  onClick: () => void;
  width?: number;
  height?: number;
}

const HeroMapCard = ({ card, isSelected, onClick, width = 400, height = 250 }: IHeroMapCardProps) => {
  const cardOpacityCSS = isSelected ? '' : 'opacity-30';
  return (
    <div
      className={`${heroMapCardCSS} ${isSelected ? selectedCardCSS : ''} ${cardOpacityCSS}`}
      style={{
        backgroundImage: `url(${card.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={onClick}>
      <div className={cardTextCSS}>{card.name}</div>
    </div>
  );
};

export default HeroMapCard;
