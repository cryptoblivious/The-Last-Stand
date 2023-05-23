//  Nom du fichier : StatBar.tsx
//  Contexte : Composant fonctionnel React servant de barre de statistiques colorée pour afficher les statistiques des personnages dans la page GameLobby
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://react.dev/

const sb_ContainerStyle = 'flex justify-start items-center p-2 bg-black bg-opacity-50  rounded-md w-full '

export interface IStatBarProps {
    statName: string;
    value: number;
    maxValue: number;
}


const StatBar = (props: IStatBarProps) => {
    const { statName, value, maxValue } = props;
    const barWidth = (value / maxValue) * 100;

    const hue = (barWidth / 100)  * 120;
    // hue to get from green to red
    const hue2 = (barWidth / 100) * 120;

    return (
        <div className={sb_ContainerStyle}>
            <h1 className="mr-2"> {statName} </h1>
            <div style={{width : `${barWidth}%` , backgroundColor:`hsl(${hue}, 100%, 50%)`}} className="h-4 rounded-md align-start"></div>
        </div>
    );

}

export default StatBar;