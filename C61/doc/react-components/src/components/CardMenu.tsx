import Card from './Card';
import { useState } from 'react';

const cardMenuContainerCSS = 'flex-col justify-center items-center gap-4 space-y-4';

export interface CardMenuCard {
    id: number;
    name: string;
    image: string;
}

interface ICardMenuProps {
    heroes: CardMenuCard[];
    visibleCards?: number;
}

const getOddNumber = (number: number) => {
    return number % 2 === 0 ? number + 1 : number;
};

const CardMenu = ({
    heroes, visibleCards = 3}: ICardMenuProps) => {
    const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
    const [carrouselStartIndex, setCarrouselStartIndex] = useState(0);

    visibleCards = getOddNumber(visibleCards);
    const centerCardIndex = Math.floor(visibleCards / 2);

    const handleCardClick = (id: number, index: number) => {
        setSelectedHeroId(id);

        //update carrousel start index when clicking on a card
        if (index !== centerCardIndex) {

            setCarrouselStartIndex((prevIndex) => {
                const newIndex = prevIndex + (index - centerCardIndex);
                return newIndex < 0 ? heroes.length + newIndex : newIndex % heroes.length;
            });
        }
    };

    const getVisibleHeroes = (startIndex: number) => {
        // get the visible cards
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
            {/* use our function to get the array of wanted visible cards */}
            {getVisibleHeroes(carrouselStartIndex).map((hero, index) => (
                <Card
                    key={hero.id}
                    card={{ id: hero.id, reference: hero.name, image: hero.image }}
                    isSelected={hero.id === selectedHeroId}
                    onClick={() => handleCardClick(hero.id, index)}
                />
            ))}
        </div>
    );
};

export default CardMenu;
