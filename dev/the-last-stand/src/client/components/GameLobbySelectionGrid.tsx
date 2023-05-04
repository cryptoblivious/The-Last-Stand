import GameLobbyCharacterCard, { gl_GridCardData } from './GameLobbyCard';

const gl_characterSelectionGridStyle = 'flex w-full h-full bg-black rounded-lg shadow-lg  bg-opacity-30 p-4 gap-4';
const gl_characterSelectionGridItemStyle = 'flex justify-center items-center w-full h-full';

interface gl_ISelectionGridProps {
    cards: gl_GridCardData[],
    onSelect: (character: gl_GridCardData) => void,
    selectedCard: gl_GridCardData | null, 
}

const GameLobbySelectionGrid: React.FC<gl_ISelectionGridProps> = (props) => {
    const { cards: characters, onSelect, selectedCard } = props;
    return (
        <div className={gl_characterSelectionGridStyle}>
            {characters.map((card) => (
                <div key={card.id} className={gl_characterSelectionGridItemStyle}>
                    <GameLobbyCharacterCard character={card} isSelected={selectedCard?.id === card.id}  onSelect={onSelect} />
                </div>
            ))}
        </div>
    );
};

export default GameLobbySelectionGrid;