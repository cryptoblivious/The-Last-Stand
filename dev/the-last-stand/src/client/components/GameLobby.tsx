import GameLobbyCharacterCard from './GameLobbyCharacterCard'; 
import { Character } from './GameLobbyCharacterCard';

const GameLobby = () => {
    
    const character = {
        id: 1,
        name: 'Character 1',
        image: 'https://picsum.photos/200/300',
        description: 'This is the description of the character',
    };

    const handleCharacterSelect = (character: Character) => {
        console.log(character);
    };

    // Just create a new page for the lobby
    return (
        // just make a small container for the card
        <div className='w-10 h-10' >
            <GameLobbyCharacterCard character={character} onSelect={handleCharacterSelect}/>

        </div>
    );
};

export default GameLobby;