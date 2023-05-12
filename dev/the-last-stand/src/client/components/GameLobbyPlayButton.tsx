

interface gl_PlayButtonProps {
    onClick: () => void;
    buttonText: string;
}

const buttonStyle = 'px-4 py-2 text-2xl font-bold text-white bg-red-500 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl';
const gl_ButtonStyle = 'px-4 py-2 text-2xl font-bold text-white w-100 h-100 bg-purple-900 rounded-xl p-1 border-4 border-fuchsia-700 hover:bg-fuchsia-700 hover:border-purple-900 transition ease-in-out duration-1000 hover:scale-110'


const GameLobbyPlayButton: React.FC<gl_PlayButtonProps> = (props) => {
    const { onClick, buttonText } = props;

    return (
        <button className={`${gl_ButtonStyle}`} onClick={onClick}>
            {buttonText}
        </button>
    );
}

export default GameLobbyPlayButton;