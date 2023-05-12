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
import { IStatBarProps } from './StatBar';
import StatsWrapper from './StatsWrapper';
import AnimatedSpriteCanvas from './AnimatedSpriteCanvas';
import spriteSheetsLoader from '../match/scenes/spritesheetsLoader';
import { IHeroesSpritePaths } from '../../typescript/interfaces/IHeroesSpritesPaths';

const gl_mainContainerStyle = "relative grid grid-rows-[minmax(100px,0.1fr)_1fr_minmax(200px,0.2fr)] h-screen p-4  bg-cover bg-center bg-repeat-x "
// const gl_mainContainerStyle = "flex flex-col h-screen p-4 animate-gradient-x bg-gradient-to-r from-neon-turquoise via-neon-purple to-neon-green"
const gl_panBackgroundStyle = "absolute inset-0 -z-50 bg-[url('/assets/wallpapers/pixel_city_lights_off.jpg')] bg-repeat-x w-screen h-screen bg-scroll"
// const gl_panBackgroundStyle2 = 'absolute inset-0 -z-50 bg-panning bg-repeat-x animate-panning w-screen h-screen bg-scroll'

const gl_gridsContainerStyle = 'flex mb-4 items-center justify-around grow '
const gl_characterSelectionGridContainerStyle = 'w-1/3 h-1/2 mr-2'
const gl_sceneSelectionGridContainerStyle = 'w-1/3 h-1/2 ml-2'
const gl_buttonSectionContainerStyle = ' flex justify-center'
const gl_BottomContainer = 'grid grid-cols-3 gap-4 h-full'
const gl_titleStyle = 'text-4xl mb-4 font-bold text-center text-shadow-md text-neon-green flex justify-center items-center grow-0 mt-10';
const gl_SubtitleStyle = 'text-2xl mb-4 font-bold text-center text-shadow-md text-neon-green flex justify-center items-center bg-black bg-opacity-50 rounded-lg shadow-lg p-2';
const gl_CharacterPreviewContainerStyle = 'grid grid-cols-2 gap-4'
const gl_PlayLoadingContainerStyle = 'flex flex-col items-center justify-center p-2'
const gl_GameOptionsContainerStyle = 'flex flex-col items-center justify-center p-2 w-full h-full border-neon-green border-4 rounded-lg shadow-lg'
const gl_CharPreviewCanvasContainerStyle = 'w-full h-full bg-transparent rounded-lg shadow-lg'
const gl_CharPreviewStatsContainer = 'w-full h-full bg-transparent border-4 border-neon-green rounded-lg shadow-lg'
const gl_TitleContainerStyle = 'flex flex-col items-center justify-center p-2 w-full h-full rounded-lg shadow-lg '

const gl_LoadingBoxText = 'Looking for players...'

const powerStat: IStatBarProps = {
    statName: 'Power',
    value: 5,
    maxValue: 10,
}

const speedStat: IStatBarProps = {
    statName: 'Speed',
    value: 10,
    maxValue: 10,
}

const defenseStat: IStatBarProps = {
    statName: 'Defense',
    value: 3,
    maxValue: 10,
}

const stats = [powerStat, speedStat, defenseStat]

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
                // const characterSpriteSheets = getSpriteSheets(heroes[0].name);
                // if (characterSpriteSheets) {
                //     setCharacterSpriteSheets(characterSpriteSheets);
                // }
            }
        });
        fetchScenesNames().then(({ scenes }) => {
            setScenes(scenes);
            if (scenes.length > 0) {
                setSelectedScene(scenes[0]);
            }
        });

        const background1 = backgroundRef1.current;
        const background2 = backgroundRef2.current;
        let x1 = 0;
        let x2 = -window.innerWidth;

        const panBackground = () => {
            const size = window.innerWidth * 1.5;


            if (background1 && background2) {
                background1.style.backgroundSize = `${size}px 100%`;
                background2.style.backgroundSize = `${size}px 100%`;
                background1.style.backgroundPositionX = `${x1}px`;
                background2.style.backgroundPositionX = `${x2}px`;
                x1++;
                x2++;
                if (x1 > window.innerWidth) {
                    x1 = -window.innerWidth;
                }
                if (x2 > window.innerWidth) {
                    x2 = -window.innerWidth;
                }
            }
            requestAnimationFrame(panBackground);
        }
        panBackground();

    }, []);


    const handleCharacterSelect = (character: gl_GridCardData) => {
        if (isInQueue) return;
        setSelectedCharacter(character);
        // const characterSpriteSheets = getSpriteSheets(character.name);
        // if (characterSpriteSheets) {
        //     setCharacterSpriteSheets(characterSpriteSheets);
        //     console.log(characterSpriteSheets);
        // }
    };

    const handleSceneSelect = (scene: gl_GridCardData) => {
        if (isInQueue) return;
        setSelectedScene(scene);
    };

    // const getSpriteSheets = (characterName: string) => {
    //     characterName = characterName.toLowerCase();
    //     const foundSpriteSheets = spriteSheetsLoader.find((spriteSheet) => spriteSheet.heroName === characterName);
    //     return foundSpriteSheets ? foundSpriteSheets : null;
    // }

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
            <div className={gl_TitleContainerStyle}>
                <div ref={backgroundRef1} className={gl_panBackgroundStyle}> </div>
                <div ref={backgroundRef2} className={gl_panBackgroundStyle}></div>
                <h1 className={gl_titleStyle}> Game Lobby</h1>
            </div>
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
            <div className={gl_BottomContainer}>
                <div className={`${gl_CharacterPreviewContainerStyle} text-neon-green`} id='char select' >
                    <div className={gl_CharPreviewCanvasContainerStyle}>
                        {selectedCharacter && <AnimatedSpriteCanvas characterName={selectedCharacter.name} delay={4000} />}

                    </div>
                    <div className={gl_CharPreviewStatsContainer}>
                        <StatsWrapper statsbars={stats} />
                    </div>
                </div>
                <div className={gl_PlayLoadingContainerStyle}>
                    <div className={gl_buttonSectionContainerStyle}>
                        <GameLobbyPlayButton onClick={handlePlayCancelClick} buttonText={buttonState.text} />
                    </div>
                    <div style={isInQueue ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                        <LoadingBox text={gl_LoadingBoxText} isVisibile={isInQueue} />
                    </div>
                </div>
                <div className={`${gl_GameOptionsContainerStyle} text-neon-green`}>
                    <p>Game Options</p>
                </div>
            </div>
        </div>
    );
};

export default GameLobby;