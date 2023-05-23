//  Nom du fichier : IHitbox.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les hitbox
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson

export interface IHitbox {
  owner: string;
  gameEntityType: string;
  position: { x: number; y: number };
}
