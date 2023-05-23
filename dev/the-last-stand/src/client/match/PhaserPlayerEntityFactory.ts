//  Nom du fichier : PhaserPlayerEntityFactory.ts
//  Contexte : Classe implémentant le pattern Factory pour les entités des joueurs
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://phaser.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 


import  PhaserPlayerEntity  from './PhaserPlayerEntity';
import SolanaEntity from './SolanaEntity';
import ChuckEntity from './ChuckEntity';
import LoganEntity from './LoganEntity';

class PhaserPlayerEntityFactory {
    private physics!: Phaser.Physics.Arcade.ArcadePhysics;
    private scene!: Phaser.Scene;

    constructor(physics: Phaser.Physics.Arcade.ArcadePhysics, scene: Phaser.Scene) {
        this.physics = physics;
        this.scene = scene;
        console.log(`physics: ${physics}`);
     }
 
    public createHero(message: any): PhaserPlayerEntity {
        switch(message.gameEntityType) {
            case 'solana':
                return new SolanaEntity(this.physics, this.scene, message);
            case 'chuck':
                return new ChuckEntity(this.physics, this.scene, message);
            case 'logan':
                return new LoganEntity(this.physics, this.scene, message);
            default:
                throw new Error(`Unknown hero type: ${message.gameEntityType}`);
        }
    }
}

export default PhaserPlayerEntityFactory;
