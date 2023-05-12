import ButtonLayer from './ButtonLayer';
import { IButtonProps } from '../../typescript/interfaces/IButtonProps';

const buttonsStyle = `w-fit bg-purple-900 rounded-xl p-1 border-4 border-fuchsia-700 hover:bg-fuchsia-700 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110`;
const GameLobbyOptionsBox = () => {
    const firstLayer: IButtonProps[] = [
        {
            onClick: () => console.log('casual!'),
            text: 'Casual',
            className: buttonsStyle,
            classNameAdditions: 'text-2xl ',
            icon: null,
            disabled: false,
            type: 'button'
        },
        {
            onClick: () => console.log('ranked!'),
            text: 'Ranked',
            className: buttonsStyle,
            classNameAdditions: 'text-2xl ',
            icon: null,
            disabled: false,
            type: 'button'
        },
    ];

    const secondLayer: IButtonProps[] = [
        {
            onClick: () => console.log('2 players!'),
            text: '2',
            className: buttonsStyle,
            classNameAdditions: 'text-2xl p-3',
            icon: null,
            disabled: false,
            type: 'button'
        },
        {
            onClick: () => console.log('3 players!'),
            text: '3',
            className: buttonsStyle,
            classNameAdditions: 'text-2xl p-3',
            icon: null,
            disabled: false,
            type: 'button'
        },
        {
            onClick: () => console.log('4 players!'),
            text: '4',
            className: buttonsStyle,
            classNameAdditions: 'text-2xl p-3',
            icon: null,
            disabled: false,
            type: 'button'
        },
    ];

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