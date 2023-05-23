//  Nom du fichier : IHeroesSpritesPaths.ts
//  Contexte : interface pour les chemins des sprites et leurs animations et dans le gameLobby
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski

import ISpriteAnimationConfig  from "./ISpriteAnimationConfig";

export interface IHeroesSpritePaths {
    heroName : string;
    spriteSheets : ISpriteAnimationConfig[];
}
