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