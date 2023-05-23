//  Nom du fichier : StatsWrapper.tsx
//  Contexte : Composant fonctionnel React servant de conteneur pour les barres de statistiques
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://react.dev/


import StatBar, { IStatBarProps } from './StatBar';

const sw_ContainerStyle = 'flex flex-col justify-between items-center p-2  rounded-md w-full h-full'

interface IStatsWrapperProps {
    statsbars: IStatBarProps[];
}

const StatsWrapper = (props: IStatsWrapperProps) => {
    const { statsbars } = props;
    return (
        <div className={sw_ContainerStyle}>
            {statsbars.map((statbar) => (
                <StatBar key={statbar.statName} {...statbar} />
            ))}
        </div>
    );
}

export default StatsWrapper;