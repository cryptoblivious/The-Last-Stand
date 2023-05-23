//  Nom du fichier : IMenuSwitcherProps.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les propriétés du composant MenuSwitcher.
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson

export default interface IMenuSwitcherProps {
  activeMenu: string;
  onClick: () => void;
}
