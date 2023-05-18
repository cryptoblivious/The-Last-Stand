

class PhaserPlayerEntity {
    private sprite?: Phaser.Physics.Arcade.Sprite;
    private playerNameText?: Phaser.GameObjects.Text;

    constructor(private physics: Phaser.Physics.Arcade.ArcadePhysics, private scene: Phaser.Scene) { }

    public create(message: any): void {
        this.sprite = this.createSprite(message);
        this.addColliders(message);
        this.createPlayerNameText(message);
        // this.setProperties(message);
    }

    private createSprite(message: any): Phaser.Physics.Arcade.Sprite {
        const spriteKey = `${message.gameEntityType}Idle`;
        const sprite = this.physics.add.sprite(message.position.x, message.position.y, spriteKey);
        sprite.setScale(2);
        return sprite;
    }

    private addColliders(message: any): void {

        message.staticgroup.forEach((staticgroup: Phaser.Physics.Arcade.StaticGroup) => {
            if (!this.sprite) return console.error('Sprite not found');
            this.scene.physics.add.collider(this.sprite, staticgroup);
        });

    }

    private setProperties(message: Map<any, any>): void {
        // Set various properties on the sprite
        // ...
        for (let [key, value] of message) {
            this.sprite?.setData(key, value);
        }

    }

    private createPlayerNameText(message: any): void {
        const playerName = message.id;
        if (!this.sprite) return console.error('Sprite not found');
        const playerNameText = this.scene.add.text(this.sprite?.x, this.sprite.y - 50, playerName, { fontSize: '24px', color: '#000000' });
        playerNameText.setOrigin(0.5, 0.5);
        this.playerNameText = playerNameText;
    }
}

export default PhaserPlayerEntity;