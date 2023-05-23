//  Nom du fichier : PlayerSprite.ts
//  Contexte : Classe héritant de la classe Phaser.Physics.Arcade.Sprite pour créer les sprite des joueurs dans le match canvas et gérer leurs propriétés
//              fait partit du pattern de Factory
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://phaser.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 



class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
    baseSpeed: number;
    airborneSpeed: number;
    jumpHeight: number;
    direction: string;
    id: string;
    jumpCount: number;
    airborneCount: number;
    maxJump: number;
    damagePercentage: number;
    frameEvents: object;
    isAlive: boolean;
    lives: number;
    weight:number;
    anim:string;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this.baseSpeed = 0;
        this.airborneSpeed = 0;
        this.jumpHeight = 0;
        this.direction = '';
        this.id = '';
        this.jumpCount = 0;
        this.airborneCount = 0;
        this.maxJump = 0;
        this.damagePercentage = 0;
        this.frameEvents = {};
        this.isAlive = true;
        this.lives = 3;
        this.weight = 0;
        this.anim = '';
        
    }
}

export default PlayerSprite;


