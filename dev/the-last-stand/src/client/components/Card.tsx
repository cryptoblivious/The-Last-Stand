const cardCSS = 'rounded-lg cursor-pointer overflow-hidden shadow-md flex justify-center items-center'
const selectedCardCSS = 'border-2 border-blue-500'
const cardTextCSS = 'text-2xl text-white text-center bg-transparent'

interface Card {
    id: number;
    reference: string;
    image: string;

}

interface CardProps {
    card: Card;
    isSelected: boolean;
    onClick: () => void;
    width?: string;
    height?: string;
}


const Card = ({ card, isSelected, onClick, width = "400px", height = "250px" }: CardProps) => {
    return (
        <div         
            className={`${cardCSS} ${isSelected ? selectedCardCSS : ''}`}
            style=
            {{
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width,
                height
            }}
            onClick={onClick}
        >
            <div className={cardTextCSS}>
                {card.reference}
            </div>
        </div>
    );
};

export default Card;