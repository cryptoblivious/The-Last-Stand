import Phaser from 'phaser';
import { Client, Room } from 'colyseus.js';
import GameEntity from '../../../server/game/GameEntity';
import { MatchState } from '../../../server/rooms/schema/MatchState';
import spriteSheetsLoader from './spritesheetsLoader';
import { capitalizeFirstLetter } from '../../../utils/text_format';
import { IGameEntityMapper } from '../../../typescript/interfaces/IGameEntityMapper';

interface MovePlayerMessage {
  playerId: string;
  x: number;
  y: number;
}

export default class ClientMatch extends Phaser.Scene {
  private gameClient?: Client;
  private playerId?: string;
  private gameEntities: Map<string, any> = new Map<string, any>();
  private playerSprites: Map<string, Phaser.Physics.Arcade.Sprite> = new Map<string, Phaser.Physics.Arcade.Sprite>();
  private mo: Room | undefined;
  // private player: any;
  private spriteSheetsLoader = spriteSheetsLoader;

  // TOUTES LES KEYS
  private keys?: any;

  constructor() {
    super('the-last-stand');
  }

  preload() {
    // LOAD DES SPRITESHEETS AVEC LE SPRITESHEETLOADER
    this.spriteSheetsLoader.forEach((spritePaths) => {
      const spriteSheetPaths = Object.values(spritePaths.spriteSheets);
      spriteSheetPaths.forEach((key) => {
        const spriteSheetName = `${spritePaths.heroName}${capitalizeFirstLetter(key.key)}`;
        this.load.spritesheet({ key: spriteSheetName, url: key.path, frameConfig: { frameWidth: key.frameWidth, frameHeight: key.frameHeight } });
      });
    });
  }

  // Get the client from the Boostrap scene
  async create(data: { client: Client }) {
    const { client } = data;
    this.gameClient = client;
    if (this.gameClient) {
    } else {
      throw new Error('client not found');
    }

    // if there is no one in the room, use joinOrCreate or it will throw an error
    this.mo = await this.gameClient.joinOrCreate<MatchState>('match_orchestrator');

    //  TOUTES LES KEYS DES MOUVEMENTS -> LAID A MORT A REFAIRE
    this.keys = this.input.keyboard.addKeys('W,A,S,D,J,K,L,U,I,O,SPACE,UP,DOWN,LEFT,RIGHT');

    // listen to state changes
    this.mo.onStateChange((state: MatchState) => {
      state.gem.forEach((ge: IGameEntityMapper, key: string) => {
        this.gameEntities.get(key)?.setPosition(ge.position.x, ge.position.y);
      });
    });

    this.mo.onMessage('assign_player_id', (message: { id: string }) => {
      this.playerId = message.id;
    });

    this.mo.onMessage('create_entity', (message: IGameEntityMapper) => {
      console.log('type', message.gameEntityType);
      this.gameEntities.set(message.id, this.physics.add.sprite(message.position.x, message.position.y, message.gameEntityType));
      this.gameEntities.get(message.id)?.setName(message.gameEntityType);
      this.gameEntities.get(message.id)?.setCollideWorldBounds(true);
      this.gameEntities.get(message.id)?.setBounce(0.2);
      this.gameEntities.get(message.id)?.setGravityY(300);
      this.gameEntities.get(message.id)?.setScale(2);
      this.gameEntities.get(message.id)?.anims.play(`${message.gameEntityType}Idle`, true);
    });

    this.mo.onMessage('remove_entity', (message: { id: string }) => {
      this.gameEntities.get(message.id)?.destroy();
      this.gameEntities.delete(message.id);
    });

    //  CREATION DES ANIMATIONS AVEC LES SPRITESHEETS DU SPRITESHEET LOADER
    this.spriteSheetsLoader.forEach((spritePaths) => {
      const spriteSheetPaths = Object.values(spritePaths.spriteSheets);
      spriteSheetPaths.forEach((key) => {
        const animKey = `${spritePaths.heroName}${capitalizeFirstLetter(key.key)}`;
        this.anims.create({
          key: animKey,
          frames: this.anims.generateFrameNumbers(animKey, { start: key.startFrame, end: key.endFrame }),
          frameRate: key.frameRate,
          repeat: key.repeat,
        });
      });
    });
  }

  update() {
    // le key down qui envoie l action pour le set velocity
    if (this.keys && this.mo?.state.gem.get(this.playerId)) {
      if (this.keys.D?.isDown) {
        this.gameEntities.get(this.playerId!)?.setFlipX(false);
        this.gameEntities.get(this.playerId!).setVelocityX(160);
        this.gameEntities.get(this.playerId!)?.play(`${this.gameEntities.get(this.playerId!)?.name}Run`, true);
      } else if (this.keys && this.keys.A?.isDown) {
        this.gameEntities.get(this.playerId!)?.setFlipX(true);
        this.gameEntities.get(this.playerId!).setVelocityX(-160);
        this.gameEntities.get(this.playerId!)?.play(`${this.gameEntities.get(this.playerId!)?.name}Run`, true);
      } else {
        this.gameEntities.get(this.playerId!)?.setVelocityX(0);
        this.gameEntities.get(this.playerId!)?.play(`${this.gameEntities.get(this.playerId!)?.name}Idle`, true);
      }

      const movePlayerMessage: MovePlayerMessage = {
        playerId: this.playerId!,
        x: this.gameEntities.get(this.playerId!).x,
        y: this.gameEntities.get(this.playerId!).y,
      };

      this.mo.send('move_player', movePlayerMessage);

      // this.mo!.state.gem.get(this.playerId).position.x = this.gameEntities.get(this.playerId!).x;
      // this.mo!.state.gem.get(this.playerId).position.y = this.gameEntities.get(this.playerId!).y;

      // // trigger state change manually
      // this.mo!.state.gem.get(this.playerId).position = { ...this.mo!.state.gem.get(this.playerId).position };
    }
  }
}
