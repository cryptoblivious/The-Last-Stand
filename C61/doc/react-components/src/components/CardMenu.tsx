import Card from './Card';
import Arrow from './Arrow';
import { useState } from 'react';

const cardMenuContainerCSS = 'flex-col justify-center items-center gap-4 space-y-4 transition-all duration-300 ease-in-out transform-gpu';
interface CardMenuCard {
    id: number;
    name: string;
    image: string;
}

interface ICardMenuProps {
    heroes: CardMenuCard[];
    visibleCards?: number;
    selectedId?: number;
    onCardClick: (card: CardMenuCard) => void;
}

const getOddNumber = (number: number) => {
    return number % 2 === 0 ? number + 1 : number;
};

const CardMenu : React.FC<ICardMenuProps> = ({heroes, selectedId, onCardClick, visibleCards = 3 }: ICardMenuProps) => {

    // make sure the number of visible cards is odd
    visibleCards = getOddNumber(visibleCards);
    // get the index of the center card
    const centerCardIndex = Math.floor(visibleCards / 2);

    // set the selected hero id to the center card
    const [selectedHeroId, setSelectedHeroId] = useState(heroes[centerCardIndex].id);
    const [carrouselStartIndex, setCarrouselStartIndex] = useState(0);

    const handleCardClick = (card:CardMenuCard, index: number) => {
        // update selected hero id
        setSelectedHeroId(card.id);
        onCardClick(card);
        

        //update carrousel start index when clicking on a card
        if (index !== centerCardIndex) {
            setCarrouselStartIndex((prevIndex) => {
                // get the new index
                const newIndex = prevIndex + (index - centerCardIndex);
                // if the new index is negative, add the length of the array to it else get the modulo
                return newIndex < 0 ? heroes.length + newIndex : newIndex % heroes.length;
            });
        }
    };

    // go to the previous or next card according to the isPrevious boolean
    const goToCard = (isPrevious:boolean) => {
        setCarrouselStartIndex((prevIndex) => {
            //
            const newIndex = isPrevious ?  prevIndex - 1 : prevIndex + 1;
            const updateIndex = newIndex < 0 ? heroes.length + newIndex : newIndex % heroes.length;
            const selectedHeroIndex = (updateIndex + centerCardIndex) % heroes.length;

            // if the selected hero index is valid, update the selected hero id
            if (selectedHeroIndex >= 0 && selectedHeroIndex < heroes.length){
                setSelectedHeroId(heroes[selectedHeroIndex].id);
                onCardClick(heroes[selectedHeroIndex]);
            }

            // const translateValue = isPrevious 
            // ? -(selectedHeroIndex * 100) + centerCardIndex * 100 
            // : (selectedHeroIndex * 100) - centerCardIndex * 100;

            return updateIndex;
        });
    };

    const getVisibleHeroes = (startIndex: number) => {
        // get the wanted visible cards
        let visibleHeroes = [];
        // if the start index is negative, add the length of the array to it
        for (let i = 0; i < visibleCards; i++) {
            const heroIndex = (startIndex + i) % heroes.length;
            const hero = heroes[heroIndex < 0 ? heroes.length + heroIndex : heroIndex];
            visibleHeroes.push(hero);
        }
        return visibleHeroes;
    }

    return (
        <div className={cardMenuContainerCSS}>
            <Arrow direction='up' onClick={() => goToCard(true)} />
           
            {/* use our function to get the array of wanted visible cards and map throught it to render them*/}
            {getVisibleHeroes(carrouselStartIndex).map((hero, index) => (
                <Card
                    key={hero.id}
                    card={{ id: hero.id, reference: hero.name, image: hero.image }}
                    isSelected={hero.id === selectedHeroId}
                    onClick={() => handleCardClick(hero, index)}
                />
            ))}
            
            <Arrow direction='down' onClick={() => goToCard(false)} />
        </div>
    );
};

export default CardMenu;
