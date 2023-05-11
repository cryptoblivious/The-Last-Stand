import GameLobbySelectionGrid from './GameLobbySelectionGrid';
import GameLobbyPlayButton from './GameLobbyPlayButton';
import { gl_GridCardData } from './GameLobbyCard';
import { ColyseusContext } from './ColyseusProvider';
import { useContext, useEffect, useState, useRef } from 'react';
import { ERooms } from '../../typescript/enumerations/ERooms';
import { fetchHeroesNames } from '../fetches/heroes';
import { fetchScenesNames } from '../fetches/scenes';
import { EMessage } from '../../typescript/enumerations/EMessage';
import SocialOverlay from './SocialOverlay';
import LoadingBox from './LoadingBox';

const gl_mainContainerStyle = "relative flex flex-col h-screen p-4  bg-cover bg-center bg-repeat-x "
// const gl_mainContainerStyle = "flex flex-col h-screen p-4 animate-gradient-x bg-gradient-to-r from-neon-turquoise via-neon-purple to-neon-green"
const gl_panBackgroundStyle = 'absolute inset-0 -z-50 bg-[url("/assets/wallpapers/cyberpunk_cityscape.png")] bg-cover  bg-no-repeat bg-center'

const gl_gridsContainerStyle = 'flex mb-4 items-center justify-around grow '
const gl_characterSelectionGridContainerStyle = 'w-1/3 h-1/2 mr-2'
const gl_sceneSelectionGridContainerStyle = 'w-1/3 h-1/2 ml-2'
const gl_buttonSectionContainerStyle = ' flex justify-center'
const gl_buttonSectionAndLoadingBoxContainerStyle = 'flex items-center justify-center flex-col grow-0'
const gl_titleStyle = 'text-4xl mb-4 font-bold text-center text-shadow-md text-neon-turquoise flex justify-center items-center grow-0';
const gl_SubtitleStyle = 'text-2xl mb-4 font-bold text-center text-shadow-md text-neon-green flex justify-center items-center bg-black bg-opacity-50 rounded-lg shadow-lg p-2';

const gl_LoadingBoxText = 'Looking for players...'

const GameLobby = () => {
    const { client, user } = useContext(ColyseusContext)
    const [selectedCharacter, setSelectedCharacter] = useState<gl_GridCardData | null>(null);
    const [selectedScene, setSelectedScene] = useState<gl_GridCardData | null>(null);
    const [characters, setCharacters] = useState<gl_GridCardData[]>([]);
    const [buttonState, setButtonState] = useState({ text: ' Play', isPlaying: false });
    const [scenes, setScenes] = useState<gl_GridCardData[]>([]);
    const [gameLobbyRoom, setGameLobbyRoom] = useState<any>(null);
    const [matchMakerRoom, setMatchMakerRoom] = useState<any>(null);
    const [isInQueue, setIsInQueue] = useState(false);
    const backgroundRef1 = useRef<HTMLDivElement>(null);
    const backgroundRef2 = useRef<HTMLDivElement>(null);

    const connectToGameLobbyRoom = async () => {
        try {
            const gameLobbyRoom = await client?.joinOrCreate(ERooms.GameLobbyRoom.toString(), user);
            return gameLobbyRoom;
        }
        catch (error) {
            console.log(error);
        }
    }

    const connectToMatchMakerRoom = async () => {
        try {
            const matchMakerRoom = await client?.joinOrCreate('match_maker_room', { username: user?.username, character: selectedCharacter?.name, scene: selectedScene?.name });
            matchMakerRoom?.onMessage(EMessage.JoinGame, (data) => {
                // redirect to game room
                console.log(data);
                const { roomId } = data;
                window.location.href = `/match/${roomId}`;
            });
            return matchMakerRoom;
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!client) return;
        connectToGameLobbyRoom().then((room) => {
            if (room) {
                setGameLobbyRoom(room);
            }
        });
        return () => {
            gameLobbyRoom?.leave();
            matchMakerRoom?.leave();
        }
    }, [client]);

    useEffect(() => {
        fetchHeroesNames().then(({ heroes }) => {
            setCharacters(heroes);
            if (heroes.length > 0) {
                setSelectedCharacter(heroes[0]);
            }
        });
        fetchScenesNames().then(({ scenes }) => {
            setScenes(scenes);
            if (scenes.length > 0) {
                setSelectedScene(scenes[0]);
            }
        });

        let x1 = 0;
        let x2 = -window.innerWidth;
        const background1 = backgroundRef1.current;
        const background2 = backgroundRef2.current;

        const resizeBackground = () => {
            if (background1 && background2) {
                background1.style.backgroundSize = `${window.innerWidth * 1.2}px ${window.innerHeight * 1.5}px`;
                background2.style.backgroundSize = `${window.innerWidth * 1.2}px ${window.innerHeight * 1.5}px`;
            }
        }
        resizeBackground();

        window.addEventListener('resize', resizeBackground);

        const panBackground = () => {
            if (background1 && background2) {
                background1.style.backgroundPositionX = `${x1}px`;
                background2.style.backgroundPositionX = `${x2}px`;
                x1++;
                x2++;
                if (x1 === window.innerWidth) {
                    x1 = -window.innerWidth;
                }
                if (x2 === window.innerWidth) {
                    x2 = -window.innerWidth;
                }
            }
            requestAnimationFrame(panBackground);
        }
        panBackground();

        return () => {
            window.removeEventListener('resize', resizeBackground);
        }
    

    }, []);

    
    const handleCharacterSelect = (character: gl_GridCardData) => {
        if (isInQueue) return;
        setSelectedCharacter(character);
    };

    const handleSceneSelect = (scene: gl_GridCardData) => {
        if (isInQueue) return;
        setSelectedScene(scene);
    };

    const handlePlayCancelClick = async () => {
        if (!gameLobbyRoom) return;
        if (!selectedCharacter || !selectedScene) { return console.log('select character and scene') };

        setButtonState((prevState) => ({
            text: prevState.isPlaying ? 'Play' : 'Cancel',
            isPlaying: !prevState.isPlaying
        }));

        if (!buttonState.isPlaying) {
            console.log('play clicked');
            // gameLobbyRoom.send(EMessage.JoinQueue, {character: selectedCharacter, scene: selectedScene})
            const matchMakeRoom = await connectToMatchMakerRoom();
            if (matchMakeRoom) {
                setMatchMakerRoom(matchMakeRoom);
                setIsInQueue(true);
            }
        } else {
            console.log('cancel clicked');
            matchMakerRoom?.leave();
            setIsInQueue(false);
        }
    }

    return (
        <div className={gl_mainContainerStyle}>
            <div ref={backgroundRef1}className={gl_panBackgroundStyle}> </div>
            <div  ref={backgroundRef2}className={gl_panBackgroundStyle}></div>
            <h1 className={gl_titleStyle}> Game Lobby</h1>
            <SocialOverlay />
            <div className={gl_gridsContainerStyle}>
                <div className={gl_characterSelectionGridContainerStyle}>
                    <h2 className={gl_SubtitleStyle}>Character Selection</h2>
                    <GameLobbySelectionGrid cards={characters} selectedCard={selectedCharacter} onSelect={handleCharacterSelect} />
                </div>
                <div className={gl_sceneSelectionGridContainerStyle}>
                    <h2 className={gl_SubtitleStyle}>Stage Selection</h2>
                    <GameLobbySelectionGrid cards={scenes} selectedCard={selectedScene} onSelect={handleSceneSelect} />
                </div>
            </div>
            <div className={gl_buttonSectionAndLoadingBoxContainerStyle}>
                <div className={gl_buttonSectionContainerStyle}>
                    <GameLobbyPlayButton onClick={handlePlayCancelClick} buttonText={buttonState.text} />
                </div>
                <div style={isInQueue ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                    <LoadingBox text={gl_LoadingBoxText} isVisibile={isInQueue} />
                </div>
            </div>
        </div>
    );
};

export default GameLobby;