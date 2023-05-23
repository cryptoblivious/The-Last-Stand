//  Nom du fichier : ButtonLayer.tsx
//  Contexte : Composant fonctionnel React servant à placer des boutons dans une rangée
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://react.dev/


import Button from "./Button";
import { IButtonProps } from '../../typescript/interfaces/IButtonProps';

interface IButtonLayerProps {
    buttons: IButtonProps[];
}

const ButtonLayer = (props:IButtonLayerProps) => {
    const buttons = props.buttons;

    return (
        <div className="flex flex-row justify-around items-center w-full h-full">
            {buttons.map((button, index) => {
                return (
                    <Button
                        key={index}
                        onClick={button.onClick}
                        className={button.className}
                        classNameAdditions={button.classNameAdditions}
                        text={button.text}
                        icon={button.icon}
                        disabled={button.disabled}
                        type={button.type}
                    />
                );
            })}
        </div>
    );
}

export	default ButtonLayer;