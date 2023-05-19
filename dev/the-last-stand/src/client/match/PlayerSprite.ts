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
        
    }
}

export default PlayerSprite;


