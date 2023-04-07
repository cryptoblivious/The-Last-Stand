import Phaser from 'phaser';
import { Client, Room } from 'colyseus.js';
import { MatchState } from '../../../server/rooms/schema/MatchState';
import spriteSheetsLoader from './spritesheetsLoader';
import { capitalizeFirstLetter } from '../../../utils/text_format';
import { IGameEntityMapper } from '../../../typescript/interfaces/IGameEntityMapper';
import backgroundImage  from '/assets/craftpix/backgrounds/background.png';
interface MovePlayerMessage {
  x: number;
  y: number;
  anim?: string;
  flipX?: boolean;
  direction?: string;
}

const baseSpeedHandler: Record<string, number> = {
  chuck: 1000,
  solana: 200,
  sirius: 150,
  logan: 150,
};

const jumpHeightHandler: Record<string, number> = {
  chuck: 400,
  solana: 500,
  sirius: 1500,
  logan: 1500,
};

const weightHandler: Record<string, number> = {
  chuck: 400,
  solana: 300,
  sirius: 300,
  logan: 300,
};

export default class ClientMatch extends Phaser.Scene {
  private gameClient?: Client;
  private playerId?: string;
  private gameEntities: Map<string, any> = new Map<string, any>();
  private mo: Room | undefined;
  private spriteSheetsLoader = spriteSheetsLoader;
  private movePlayerMessage?: MovePlayerMessage
  private background?: Phaser.GameObjects.Image
  
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

    // Load backgrounds and tiles
    this.load.image('background', backgroundImage);
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
    this.mo.onStateChange((state: MatchState) => { });

    this.mo.onMessage('assign_player_id', (message: { id: string }) => {
      this.playerId = message.id;
    });

    this.mo.onMessage('create_entity', (message: IGameEntityMapper) => {
      this.gameEntities.set(message.id, this.physics.add.sprite(message.position.x, message.position.y, `${message.gameEntityType}Idle`));

      const entity = this.gameEntities.get(message.id);

      entity.setName(message.gameEntityType);
      entity.setCollideWorldBounds(true);
      entity.setBounce(0.2);
      entity.setGravityY(weightHandler[message.gameEntityType]);
      entity.setScale(2);
      entity.anims.play(`${message.gameEntityType}Idle`, true);
      entity.baseSpeed = baseSpeedHandler[message.gameEntityType];
      entity.jumpHeight = jumpHeightHandler[message.gameEntityType];
      console.log(entity);
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

    //  CREATION DU BACKGROUND ET DU TUILAGE
    // Background
    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    // stretch the background to fit the whole screen
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;
    
    

  }

  update() {
    // le key down qui envoie l action pour le set velocity
    if (this.keys && this.mo?.state.gem.get(this.playerId)) {

      let isAttacking = false;
      let anim = '';
      let direction = '';
      const entity = this.gameEntities.get(this.playerId!);

      if (entity.body.velocity.y < -10) {
        anim = `${entity.name}Jump`;
      }
      else if (this.keys.D?.isDown || this.keys.A?.isDown || this.keys.W?.isDown || this.keys.J?.isDown || this.keys.K?.isDown || this.keys.L?.isDown || this.keys.U?.isDown || this.keys.I?.isDown || this.keys.O?.isDown || this.keys.SPACE?.isDown || this.keys.UP?.isDown || this.keys.DOWN?.isDown || this.keys.LEFT?.isDown || this.keys.RIGHT?.isDown) {

        if (this.keys.A?.isDown && this.keys.D?.isDown || this.keys.LEFT?.isDown && this.keys.RIGHT?.isDown) {
          anim = `${entity.name}Idle`;
          entity.setVelocityX(0);
        }

        else if (this.keys.D?.isDown || this.keys.RIGHT?.isDown) {
          anim = `${entity.name}Run`;
          entity.setVelocityX(entity.baseSpeed);
          direction = 'right';
        }

        else if (this.keys.A?.isDown || this.keys.LEFT?.isDown) {
          anim = `${entity.name}Run`;
          entity.setVelocityX(-entity.baseSpeed);
          direction = 'left';
        }
        else if (this.keys.J.isDown) {
          anim = `${entity.name}Attack1`;
        }

        if (this.keys.W?.isDown || this.keys.UP?.isDown || this.keys.SPACE?.isDown) {
          entity.setVelocityY(-entity.jumpHeight);
        }
      }
      else if (!isAttacking) {
        anim = `${entity.name}Idle`;
        entity.setVelocityX(0)
      }

      this.movePlayerMessage = {
        x: entity.x,
        y: entity.y,
        anim: anim,
        direction: direction,
      };


      this.mo.send('move_player', this.movePlayerMessage);



      this.mo.state.gem.forEach((gem: IGameEntityMapper, key: string) => {
        const entity = this.gameEntities.get(key);
        if (entity) {
          entity.setPosition(gem.position.x, gem.position.y);
          let animCompleted = undefined
          if (gem.direction !== ''){
            let flipX;
            if (gem.direction == 'left') {
              flipX = true;
            }
            else if (gem.direction == 'right') {
              flipX = false;
            }
            entity.setFlipX(flipX);
          }
          // wait for the attack animation do be finished before doing anything else
          if (gem.anim == `${gem.gameEntityType}Attack1`) {
            // entity.anims.stop();
            animCompleted = false;
            entity.anims.play(`${gem.gameEntityType}Attack1`, true);
            entity.on('animationcomplete', () => {
              // entity.anims.play(`${gem.gameEntityType}Idle`, true);
              animCompleted = true;
              console.log ('anim completed')
            });
          }  
          if (animCompleted || animCompleted === undefined) {
          entity.play(gem.anim, true);
          }
        }
      });
    }
  }
}
