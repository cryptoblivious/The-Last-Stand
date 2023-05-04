import GameLobbySelectionGrid from './GameLobbySelectionGrid';
import GameLobbyPlayButton from './GameLobbyPlayButton';
import { gl_GridCardData } from './GameLobbyCard';
import { ColyseusContext } from './ColyseusProvider';
import { useContext, useEffect, useState } from 'react';
import { ERooms } from '../../typescript/enumerations/ERooms';
import { fetchHeroesNames } from '../fetches/heroes';
import { fetchScenesNames } from '../fetches/scenes';
import { EMessage } from '../../typescript/enumerations/EMessage';
import SocialOverlay from './SocialOverlay';

const gl_mainContainerStyle = "flex flex-col h-screen p-4 bg-[url('/assets/wallpapers/gl_poker_players2.jpg')] bg-cover bg-center bg-no-repeat"
const gl_gridsContainerStyle = 'flex flex-1 mb-4 items-center justify-around'
const gl_characterSelectionGridContainerStyle = 'w-1/3 h-1/2 mr-2'
const gl_sceneSelectionGridContainerStyle = 'w-1/3 h-1/2 ml-2'
const gl_buttonSectionContainerStyle = 'flex justify-center'


const GameLobby = () => {
    const { client, user } = useContext(ColyseusContext)
    const [selectedCharacter, setSelectedCharacter] = useState<gl_GridCardData | null>(null);
    const [selectedScene, setSelectedScene] = useState<gl_GridCardData | null>(null);
    const [characters, setCharacters] = useState<gl_GridCardData[]>([]);
    const [buttonState, setButtonState] = useState({text :' Play', isPlaying: false});
    const [scenes, setScenes] = useState<gl_GridCardData[]>([]);
    const [gameLobbyRoom, setGameLobbyRoom] = useState<any>(null); 
    const [matchMakerRoom, setMatchMakerRoom] = useState<any>(null);
    
    const connectToGameLobbyRoom = async () => {
        try{
            const gameLobbyRoom = await client?.joinOrCreate(ERooms.GameLobbyRoom.toString(), user);
            // gameLobbyRoom?.onMessage(EMessage.JoinQueue, (message) => {
            //     console.log(message);
            // });
            return gameLobbyRoom;
        }
        catch(error){
            console.log(error);
        }
    }

    const connectToMatchMakerRoom = async () => {
        try{
            const matchMakerRoom = await client?.joinOrCreate('match_maker_room', {username : user?.username, character: selectedCharacter, scene: selectedScene});
            return matchMakerRoom;
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if (!client) return;
        connectToGameLobbyRoom().then((room) => {
            if(room){
                setGameLobbyRoom(room);
            }
        });
        fetchHeroesNames().then(({heroes}) => {
            setCharacters(heroes);
            if (heroes.length > 0) {
                setSelectedCharacter(heroes[0]);
            }
        });
        fetchScenesNames().then(({scenes}) => {
            setScenes(scenes);
            if (scenes.length > 0) {
                setSelectedScene(scenes[0]);
            }
        });
        return () => {
            gameLobbyRoom?.leave();
        }
    }, [client]);

    const handleCharacterSelect = (character: gl_GridCardData) => {
        setSelectedCharacter(character);
    };

    const handleSceneSelect = (scene: gl_GridCardData) => {
        setSelectedScene(scene);
    };

    const handlePlayCancelClick = async () => {
        if (!gameLobbyRoom) return;
        if (!selectedCharacter || !selectedScene) { return console.log('select character and scene')};
        
        setButtonState((prevState) => ({
            text: prevState.isPlaying ? 'Play' : 'Cancel',
            isPlaying: !prevState.isPlaying
        }));

        if (!buttonState.isPlaying) {
            console.log('play clicked');
            gameLobbyRoom.send(EMessage.JoinQueue, {character: selectedCharacter, scene: selectedScene})
            const room = await connectToMatchMakerRoom();
            if(room){
                setMatchMakerRoom(room);
            }
        }else {
            console.log('cancel clicked');
            matchMakerRoom?.leave();

        }

        // console.log(`play clicked with ${selectedCharacter?.name} and ${selectedScene?.name}`);
    }

    return (
        <div className={gl_mainContainerStyle}>
            <SocialOverlay />
            <div className={gl_gridsContainerStyle}>
                <div className={gl_characterSelectionGridContainerStyle}>
                    <GameLobbySelectionGrid cards={characters} selectedCard={selectedCharacter} onSelect={handleCharacterSelect} />
                </div>
                <div className={gl_sceneSelectionGridContainerStyle}>
                    <GameLobbySelectionGrid cards={scenes} selectedCard={selectedScene} onSelect={handleSceneSelect} />
                </div>
            </div>
            <div className={gl_buttonSectionContainerStyle}>
                <GameLobbyPlayButton onClick={handlePlayCancelClick} buttonText={buttonState.text} />
            </div>
        </div>

    );
};

export default GameLobby;