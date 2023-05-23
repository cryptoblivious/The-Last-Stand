//  Nom du fichier : PhaserPlayerEntity.ts
//  Contexte : Classe ayant les attributs nécéssaires pour créer un jouer dans le jeu avec ses propriétés spécifiques. 
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://phaser.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 

import PlayerSprite from './PlayerSprite';

class PhaserPlayerEntity {
    private _sprite?: PlayerSprite;
    private _playerNameText?: Phaser.GameObjects.Text;
    message : any

    constructor(private physics: Phaser.Physics.Arcade.ArcadePhysics, private scene: Phaser.Scene, message:any) {
        this.message = message;
        
     }

    protected create(): void {
        this._sprite = this.createSprite(this.message);
        this.addColliders(this.message);
        this.createPlayerNameText(this.message);
        // this.setProperties(message);
    }
    
    get sprite (): PlayerSprite | undefined {
        return this._sprite;
    }

    get playerNameText (): Phaser.GameObjects.Text | undefined {
        return this._playerNameText;
    }

    set playerNameText (text: Phaser.GameObjects.Text | undefined) {
        this._playerNameText = text;
    }

    private createSprite(message: any): PlayerSprite {
        const spriteKey = `${message.gameEntityType}idle`;
        const sprite = new PlayerSprite(this.scene, message.x, message.y, spriteKey);
        this.scene.add.existing(sprite);
        this.physics.add.existing(sprite);
        console.log('sprite', sprite);
        return sprite;
    }

    private addColliders(message: any): void {
        
        message.staticgroup.forEach((staticgroup: Phaser.Physics.Arcade.StaticGroup) => {
            if (!this.sprite) return console.error('Sprite not found');
            this.physics.add.collider(this.sprite, staticgroup);
        });
    }

    private createPlayerNameText(message: any): void {
        const playerName = message.playerName;
        if (!this.sprite) return console.error('Sprite not found');
        const playerNameText = this.scene.add.text(this.sprite?.x, this.sprite.y - 50, playerName, { fontSize: '24px', color: '#000000' });
        playerNameText.setOrigin(0.5, 0.5);
        this._playerNameText = playerNameText;
    }
}

export default PhaserPlayerEntity;