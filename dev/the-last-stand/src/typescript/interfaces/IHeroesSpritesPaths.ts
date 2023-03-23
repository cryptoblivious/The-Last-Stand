// Interface for spriteSheetsLoader
import ISpriteAnimationConfig  from "./ISpriteAnimationConfig";


// export default interface IHeroesSpritesPaths {
//     name : string;


// export interface IHeroesSpritePaths {
//     [heroName: string]: {
//       paths: Record<string, string>;
//       animations: Record<string, {
//         frameWidth: number;
//         frameHeight: number;
//         startFrame: number;
//         endFrame: number;
//         frameRate: number;
//         repeat: number;
//       }>;
//     };
//   }
  

export interface IHeroesSpritePaths {
    heroName : string;
    spriteSheets : ISpriteAnimationConfig[];
}
