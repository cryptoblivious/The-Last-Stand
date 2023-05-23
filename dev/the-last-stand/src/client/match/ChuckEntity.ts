//  Nom du fichier : ChuckEntity.ts
//  Contexte : Classe héritant de la classe PhaserPlayerEntity pour créer le personnage Chcuck, utilisé dans le factory 
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://phaser.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 

import PhaserPlayerEntity from "./PhaserPlayerEntity";

class ChuckEntity extends PhaserPlayerEntity {
    constructor(physics: Phaser.Physics.Arcade.ArcadePhysics, scene: Phaser.Scene, message: any) {
        super(physics, scene, message);
        this.create();
    }

    public create(): void {
        super.create();
        this.setHeroProperties(this.message);

    }

    private setHeroProperties(message: any): void {
        const entity = this.sprite;
        if (!entity) return;
        // setting hero specific properties
        entity.setName('Chuck');
        entity.setBounce(0.1);
        entity.setGravityY(300);
        entity.setScale(2);
        entity.direction = message.direction;
        entity.id = message.id;
        entity.jumpHeight = 800;
        entity.baseSpeed = 500;
        entity.airborneSpeed = 1000;
        entity.weight = 300;
        entity.maxJump = 2;
        

    }
}

export default ChuckEntity;