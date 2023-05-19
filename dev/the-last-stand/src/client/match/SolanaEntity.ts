import PhaserPlayerEntity from "./PhaserPlayerEntity";

class SolanaEntity extends PhaserPlayerEntity {
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
        entity.setName('Solana');
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

export default SolanaEntity;