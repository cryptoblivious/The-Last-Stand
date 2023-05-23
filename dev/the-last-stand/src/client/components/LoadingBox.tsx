//  Nom du fichier : HeroMapCard.tsx
//  Contexte : Composant fonctionnel React servant de boîte de chargement utilisée dans le GameLobby
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://react.dev/


import { RingLoader } from "react-spinners";

const l_ContainerStyle = 'flex flex-col items-center justify-center transition duration-500 ease-in-out'
const l_TextStyle = 'text-3xl text-neon-green'
const l_LoaderStyle = 'mt-5'

interface ILoadingBoxProps {
    text : string;
    isVisibile : boolean;
    containerStyle? : string;
    textStyle? : string;
    loaderStyle? : string;
    color? : string;
    size? : number;
}

const LoadingBox = (props : ILoadingBoxProps) => {
    const {text, isVisibile, containerStyle, textStyle, loaderStyle, size, color } = props;
    const opacityClass = isVisibile ? 'opacity-100' : 'opacity-0';
    return (
        <div className={`${containerStyle ? containerStyle : l_ContainerStyle} ${opacityClass}`}>
            <RingLoader color={color ? color : '#05c46b'} size={size ? size : 75} className={loaderStyle ? loaderStyle : l_LoaderStyle}/>
            <p className={textStyle ? textStyle : l_TextStyle}>{text}</p>
        </div>
    );
}

export default LoadingBox;