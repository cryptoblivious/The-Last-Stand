import PhaserPlayerEntity from "./PhaserPlayerEntity";

class SolanaEntity extends PhaserPlayerEntity {
    constructor(physics: Phaser.Physics.Arcade.ArcadePhysics, scene: Phaser.Scene, message: any) {
        super(physics, scene, message);
        this.create();
    }

    public create(): void {
        super.create();

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

    }
}

export default SolanaEntity;