import React from 'react';

const gl_characterCardStyle = 'relative w-full h-full bg-cover bg-center bg-no-repeat rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl';
const gl_characterCardTextContainerStyle = 'absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent rounded-b-lg';
const gl_characterCardTextStyle = 'text-2xl font-bold text-center text-white';

export type gl_GridCardData = {
    id: number,
    name: string,
    image: string,
    description?: string,
}

interface IGameLobbyCharacterCardProps {
    character: gl_GridCardData,
    onSelect: (character: gl_GridCardData) => void,
}


const GameLobbyCharacterCard: React.FC<IGameLobbyCharacterCardProps> = ({ character, onSelect }) => {
    const { name, image } = character;

    return (
        <div
            className={gl_characterCardStyle}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => onSelect(character)}
        >
            <div className={gl_characterCardTextContainerStyle}>
                <p className={gl_characterCardTextStyle}>{name}</p>
            </div>
        </div>

    );
};

export default GameLobbyCharacterCard;