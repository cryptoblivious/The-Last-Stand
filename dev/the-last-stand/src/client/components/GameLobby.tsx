import GameLobbySelectionGrid from './GameLobbySelectionGrid';
import { gl_GridCardData } from './GameLobbyCard';
import { ColyseusContext } from './ColyseusProvider';
import { useContext, useEffect } from 'react';

const gl_mainContainerStyle = 'flex flex-col h-screen p-4 '
const gl_gridsContainerStyle = 'flex flex-1 mb-4 items-center justify-around'
const gl_characterSelectionGridContainerStyle = 'w-1/3 h-1/2 mr-2'
const gl_sceneSelectionGridContainerStyle = 'w-1/3 h-1/2 ml-2'
const gl_buttonSectionContainerStyle = 'flex justify-center'
const gl_buttonStyle = 'px-4 py-2 text-2xl font-bold text-white bg-red-500 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl'

const characters: gl_GridCardData[] = [];
for (let i = 0; i < 9; i++) {
    const character: gl_GridCardData = {
        id: i,
        name: `character ${i}`,
        image: 'https://picsum.photos/200/300'
    };
    characters.push(character);
}

const scenes: gl_GridCardData[] = [];
for (let i = 0; i < 9; i++) {
    const scene: gl_GridCardData = {
        id: i,
        name: `scene ${i}`,
        image: 'https://picsum.photos/200/300'
    };
    scenes.push(scene);
}

const GameLobby = () => {

    const { client, user } = useContext(ColyseusContext)

    const connect = async () => {
        try{
            const gameLobbyRoom = await client?.joinOrCreate('game_lobby_room', user);
            console.log(gameLobbyRoom?.state);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if (!client) return;
        console.log(user);
        connect();
    }, [client]);

    const handleCharacterSelect = (character: gl_GridCardData) => {
        console.log(character);
    };

    return (
        <div className={gl_mainContainerStyle}>
            <div className={gl_gridsContainerStyle}>
                <div className={gl_characterSelectionGridContainerStyle}>
                    <GameLobbySelectionGrid characters={characters} onSelect={handleCharacterSelect} />
                </div>
                <div className={gl_sceneSelectionGridContainerStyle}>
                    <GameLobbySelectionGrid characters={scenes} onSelect={handleCharacterSelect} />
                </div>
            </div>
            <div className={gl_buttonSectionContainerStyle}>
                <button className={gl_buttonStyle}> Start Game</button>
            </div>
        </div>

    );
};

export default GameLobby;