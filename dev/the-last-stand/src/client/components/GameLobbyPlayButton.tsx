

interface gl_PlayButtonProps {
    onClick: () => void;
    buttonText: string;
}

const buttonStyle = 'px-4 py-2 text-2xl font-bold text-white bg-red-500 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl';

const GameLobbyPlayButton: React.FC<gl_PlayButtonProps> = (props) => {
    const { onClick, buttonText } = props;

    return (
        <button className={`${buttonStyle}`} onClick={onClick}>
            {buttonText}
        </button>
    );
}

export default GameLobbyPlayButton;