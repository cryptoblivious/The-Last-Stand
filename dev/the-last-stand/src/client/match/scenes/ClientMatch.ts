import Phaser from 'phaser';
import { Client, Room } from 'colyseus.js';
import GameEntity from '../../../server/game/GameEntity';
import { MatchState } from '../../../server/rooms/schema/MatchState';
import spriteSheetsLoader from './spritesheetsLoader';
import { capitalizeFirstLetter } from '../../../utils/text_format';

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
      // console.log(spritePaths);
      const spriteSheetPaths = Object.values(spritePaths.spriteSheets);
      spriteSheetPaths.forEach((key) => {
        const spriteSheetName = `${spritePaths.heroName}${capitalizeFirstLetter(key.key)}`;
        this.load.spritesheet({ key: spriteSheetName, url: key.path, frameConfig: { frameWidth: key.frameWidth, frameHeight: key.frameHeight } });
        // console.log(spriteSheetName);
      });
    });
  }

  // Get the client from the Boostrap scene
  async create(data: { client: Client }) {
    const { client } = data;
    this.gameClient = client;
    if (this.gameClient) {
      console.log('client', this.gameClient);
    } else {
      throw new Error('client not found');
    }

    // if there is no one in the room, use joinOrCreate or it will throw an error
    this.mo = await this.gameClient.joinOrCreate<MatchState>('match_orchestrator');
    console.log('mo', this.mo);

    //  TOUTES LES KEYS DES MOUVEMENTS -> LAID A MORT A REFAIRE
    this.keys = this.input.keyboard.addKeys('W,A,S,D,J,K,L,U,I,O,SPACE,UP,DOWN,LEFT,RIGHT');
    console.log('keys', this.keys);
    console.log('d key', this.keys.D);

    // // COLYSEUS;
    // // listen to state changes
    // this.mo.onStateChange((state: MatchState) => {
    //   this.gameEntities = state.gem;
    //   console.log(state);
    // });

    this.mo.onMessage('assign_id', (message: { id: string }) => {
      console.log(message);
      this.playerId = message.id;
    });

    this.mo.onMessage('create_entity', (message: { id: string; position: { x: number; y: number } }) => {
      console.log(message);
      this.gameEntities.set(message.id, this.physics.add.sprite(message.position.x, message.position.y, 'chuckIdle'));
      this.gameEntities.get(message.id)?.setCollideWorldBounds(true);
      this.gameEntities.get(message.id)?.setBounce(0.2);
      this.gameEntities.get(message.id)?.setGravityY(300);
      this.gameEntities.get(message.id)?.setScale(2);
      console.log(this.gameEntities);
    });

    // // COLYSEUS
    // this.mo.onMessage('res_action', (message: { id: string; velocity: number }) => {
    //   // REPONSE DU SERVEUR EN CE MOMENT ON RECOIT LA VELOCITY ET LE ID DU JOUEUR
    //   console.log(message.id, message.velocity);
    //   this.playerSprites.get(message.id)?.setVelocityX(message.velocity);
    //   this.mo!.state.entities.get(message.id).position.x = this.playerSprites.get(message.id)?.x;
    //   // this.player?.setVelocityX(message.velocity);
    // });

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
    if (this.keys) {
      if (this.keys.D?.isDown) {
        this.gameEntities.get(this.playerId!)?.setFlipX(false);
        this.gameEntities.get(this.playerId!).setVelocityX(160);
        console.log(this.gameEntities.get(this.playerId!));
        this.gameEntities.get(this.playerId!)?.play('chuckRun', true);
        console.log('player', this.mo?.state.gem.get(this.playerId));
        console.log(this.gameEntities);
      } else if (this.keys && this.keys.A?.isDown) {
        this.gameEntities.get(this.playerId!)?.setFlipX(true);
        this.gameEntities.get(this.playerId!).setVelocityX(-160);
        this.gameEntities.get(this.playerId!)?.play('chuckRun', true);
      } else {
        this.gameEntities.get(this.playerId!)?.setVelocityX(0);
        this.gameEntities.get(this.playerId!)?.play('chuckIdle', true);
      }
      console.log(this.mo!.state.gem);
      //this.mo!.state.gem.get(this.playerId).position.x = this.gameEntities.get(this.playerId!).x;
    }
  }
}
