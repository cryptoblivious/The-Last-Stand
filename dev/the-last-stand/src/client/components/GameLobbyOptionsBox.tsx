import ButtonLayer from './ButtonLayer';
import { IButtonProps } from '../../typescript/interfaces/IButtonProps';
import { useEffect, useState } from 'react';

const buttonsStyle = `w-fit bg-purple-900 rounded-xl p-1 border-4 border-fuchsia-700 hover:bg-fuchsia-700 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110 text-white`;
const selectedButtonStyle = `w-fit bg-purple-900 rounded-xl p-1 border-4 border-neon-green text-neon-green`;
const GameLobbyOptionsBox = (props:{setSelectionOptions: any}) => {
    const { setSelectionOptions } = props;
    const [gameMode, setGameMode] = useState('casual');
    const [playerCount, setPlayerCount] = useState(2);
    const firstLayer: IButtonProps[] = [
        {
            onClick: () => {
                console.log('casual!')
                setSelectionOptions((prevOptions:any) => ({...prevOptions, gameMode: 'casual'}) );
                setGameMode('casual');
            },
            text: 'Casual',
            className: gameMode === 'casual' ? selectedButtonStyle : buttonsStyle,
            classNameAdditions: 'text-2xl ',
            icon: null,
            disabled: false,
            type: 'button'
        },
        {
            onClick: () => {
                console.log('ranked!')
                setSelectionOptions((prevOptions:any) => ({...prevOptions, gameMode: 'ranked'}) );
                setGameMode('ranked');
            },
            text: 'Ranked',
            className: gameMode === 'ranked' ? selectedButtonStyle : buttonsStyle,
            classNameAdditions: 'text-2xl ',
            icon: null,
            disabled: false,
            type: 'button'
        },
    ];

    const secondLayer: IButtonProps[] = [
        {
            onClick: () => {
                console.log('2 players!')
                setSelectionOptions((prevOptions:any) => ({...prevOptions, playerCount: 2}) );
                setPlayerCount(2);
            },
            text: '2',
            className: playerCount === 2 ? selectedButtonStyle : buttonsStyle,
            classNameAdditions: 'text-2xl p-3',
            icon: null,
            disabled: false,
            type: 'button'
        },
        {
            onClick: () => {
                console.log('3 players!')
                setSelectionOptions((prevOptions:any) => ({...prevOptions, playerCount: 3}) );
                setPlayerCount(3);
            },
            text: '3',
            className: playerCount === 3 ? selectedButtonStyle : buttonsStyle,
            classNameAdditions: 'text-2xl p-3',
            icon: null,
            disabled: false,
            type: 'button'
        },
        {
            onClick: () => {
                console.log('4 players!')
                setSelectionOptions((prevOptions:any) => ({...prevOptions, playerCount: 4}) );
                setPlayerCount(4);
            },
            text: '4',
            className: playerCount === 4 ? selectedButtonStyle : buttonsStyle,
            classNameAdditions: 'text-2xl p-3',
            icon: null,
            disabled: false,
            type: 'button'
        },
    ];

    useEffect(() => {
        setGameMode(setSelectionOptions.gameMode);
      }, [setSelectionOptions.gameMode]);
    
      useEffect(() => {
        setPlayerCount(setSelectionOptions.playerCount);
      }, [setSelectionOptions.playerCount]);

    return (
        <div className="flex flex-col justify-center items-center w-full h-full border-l-2 border-neon-green">
            <div className='flex flex-row justify-around w-full h-full items-center border-b-2 border-neon-green'>
                <div className='flex items-center justify-center w-full h-full'>
                    <h2 className='text-3xl text-neon-green'>
                        Select Game Mode
                    </h2>
                </div>
                <ButtonLayer buttons={firstLayer} />
            </div>

            <div className='flex flex-row justify-around w-full h-full items-center'>
                <div className='flex items-center justify-center w-full h-full'>
                    <h2 className='text-3xl text-neon-green'>
                        Select Players Count
                    </h2>
                </div>
                <ButtonLayer buttons={secondLayer} />
            </div>
        </div>
    );
}

export default GameLobbyOptionsBox;