//  Nom du fichier : IStyledClickableCurrentComponent.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les composants cliquables stylisés et courants
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson

export interface IStyledClickableCurrentComponent {
  onClick: () => void;
  className: string;
  current: boolean;
}
