import GameLobbyCharacterCard, { gl_GridCardData } from './GameLobbyCard';

const gl_characterSelectionGridStyle = 'grid grid-cols-3 gap-4 w-full h-full';
const gl_characterSelectionGridItemStyle = 'flex justify-center items-center w-full h-full';

interface gl_ISelectionGridProps {
    characters: gl_GridCardData[],
    onSelect: (character: gl_GridCardData) => void,
}

const GameLobbySelectionGrid: React.FC<gl_ISelectionGridProps> = (props) => {
    const { characters, onSelect } = props;
    return (
        <div className={gl_characterSelectionGridStyle}>
            {characters.map((character) => (
                <div key={character.id} className={gl_characterSelectionGridItemStyle}>
                    <GameLobbyCharacterCard character={character} onSelect={onSelect} />
                </div>
            ))}
        </div>
    );
};

export default GameLobbySelectionGrid;