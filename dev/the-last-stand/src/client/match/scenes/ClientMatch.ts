import Phaser from 'phaser';
import { Client , Room } from 'colyseus.js';
import GameEntity from '../../../server/game/GameEntity';
import { ServerMatch } from '../../../server/rooms/schema/ServerMatch';
import spriteSheetsLoader from './spritesheetPaths';
import { capitalizeFirstLetter } from '../../../utils/text_format';

export default class ClientMatch extends Phaser.Scene {
  private client?: Client;
  private entities: Map<string, GameEntity> = new Map<string, GameEntity>();
  private players: Map<string, Phaser.GameObjects.Rectangle> = new Map<string, Phaser.GameObjects.Rectangle>();
  private playerSprites: Map<string, Phaser.Physics.Arcade.Sprite> = new Map<string, Phaser.Physics.Arcade.Sprite>();
  private room : Room | undefined;
  private player: any
  private spriteSheetsLoader = spriteSheetsLoader;
  

  private keyA?: Phaser.Input.Keyboard.Key
  private keyW?: Phaser.Input.Keyboard.Key
  private keyS?: Phaser.Input.Keyboard.Key
  private keyD?: Phaser.Input.Keyboard.Key
  private keyJ?: Phaser.Input.Keyboard.Key
  private keyK?: Phaser.Input.Keyboard.Key
  private keyL?: Phaser.Input.Keyboard.Key
  private keyU?: Phaser.Input.Keyboard.Key
  private keyI?: Phaser.Input.Keyboard.Key
  private keyO?: Phaser.Input.Keyboard.Key
  private keySpace?: Phaser.Input.Keyboard.Key

  private inputHandler: Record<string, number> = {
    ' ': 0,
    w: 0,
    a: 1,
    s: 2,
    d: 3,
    j: 4,
    k: 5,
    l: 6,
    u: 7,
    i: 8,
    o: 9,
  };

  constructor() {
    super('the-last-stand');
  }

  init() {
  }

  preload() {
   
    // Create the sprite sheets
    this.spriteSheetsLoader.forEach((spritePaths) => {
      // console.log(spritePaths);
      const spriteSheetPaths = Object.values(spritePaths.spriteSheets);
      spriteSheetPaths.forEach((key) => {
        const spriteSheetName = `${spritePaths.heroName}${capitalizeFirstLetter(key.key)}`;
        this.load.spritesheet(spriteSheetName, key.path, { frameWidth: key.frameWidth, frameHeight: key.frameHeight });
        // console.log(spriteSheetName);
      })
    });
  }


  async create(data: { client: Client }) {
    const { client } = data;
    this.client = client;
    if (!this.client) {
      throw new Error('client not found');
    }

    // if there is no one in the room, use joinOrCreate or it will throw an error
    this.room = await this.client.joinOrCreate<ServerMatch>('match_orchestrator');

    this.room.onMessage('res_action', (message) => {
      // console.log(message);
    });

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    this.keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    this.input.keyboard.on('keydown', (event: KeyboardEvent) => {

      // translate key to action and send to server
      // if (event.key in this.inputHandler) {
      //   this.room?.send('req_action', this.inputHandler[event.key]);
      // }
      // console.log(event.key);
    });

    // // listen to state changes
    this.room.onStateChange((state: ServerMatch) => {
      this.entities = state.entities;
      // console.log(state);
    });
    this.room.onMessage('res_action', (message) => {
      console.log(message.id, message.velocity);
      // this.playerSprites.get(message.id)?.setVelocityX(message.velocity);
      this.player?.setVelocityX(message.velocity);
    });

    //  create the animations 
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
        // console.log(animKey);
      })
    });



    this.player = this.physics.add.sprite(100, 450, 'chuckIdle');
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);

    // this.anims.create({
    //   key: 'chuckIdleRight',
    //   frames: this.anims.generateFrameNumbers('chuckidleRight', { start: 0, end: 3 }),
    //   frameRate: 8,
    //   repeat: -1
    // });
    // this.anims.create({
    //   key: 'chuckRunRight',
    //   frames: this.anims.generateFrameNumbers('chuckrunRight', { start: 0, end: 3 }),
    //   frameRate: 12,
    //   repeat: -1
    // });


    // this.player.setScale(2);


    // loop throught the animations
    // const anims = [ 'chuckIdle', 'chuckRun', 'chuckAttack1', 'chuckAttack2',  'chuckAttack3' ,'chuckJump', 'chuckHurt', 'chuckDeath', 'chuckClimb', 'chuckDoublejump', 'chuckKick', 'chuckRunAttack']
    // const duration = 2000;
    // let currentIndex = 0
    // let rounds = 0;
    // this.time.addEvent({
    //   delay: duration,
    //   loop: true,
    //   callback: () => {
    //     this.player?.play(anims[currentIndex]);
    //     currentIndex = (currentIndex + 1) % anims.length;
    //     rounds++;
    //     if ( rounds % 2) {
    //       this.player?.setFlipX(!this.player?.flipX);
    //     }
    //   } 
    // });
  }

  // render sprites for each player in the state using the playerSprits map
  renderPlayerSprites() {
    const activeEntitiesNames = Array.from(this.entities.keys());

    const spritesToRemove = Array.from(this.playerSprites.values()).filter((sprite) => !activeEntitiesNames.includes(sprite.name));
    for (const sprite of spritesToRemove) {
      sprite.destroy();
      this.playerSprites.delete(sprite.name);
    }

    for (const entity of this.entities.values()) {
      const existingSprite = this.playerSprites.get(entity.name);
       if (!existingSprite) {
        const sprite = this.physics.add.sprite(entity.position.x, entity.position.y, 'chuckIdle')
        sprite.name = entity.name;
        sprite.setScale(2);
        sprite.setCollideWorldBounds(true);
        sprite.setBounce(0.2);
        sprite.setGravityY(300 )
        this.playerSprites.set(entity.name, sprite);
      } else {
        existingSprite.setPosition(entity.position.x, entity.position.y);
      }
    }
  }

  

  render_players(entities: Map<string, GameEntity>) {
    const activeEntitiesNames = Array.from(entities.keys());

    const rectToRemove = Array.from(this.players.values()).filter((rect) => !activeEntitiesNames.includes(rect.name));
    for (const rect of rectToRemove) {
      rect.destroy();
      this.players.delete(rect.name);
    }
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];

    for (const entity of entities.values()) {
      const existingRect = this.players.get(entity.name);

      if (!existingRect) {
        const rect = this.add.rectangle(entity.position.x, entity.position.y, entity.size.width, entity.size.height, colors[entity.id]);
        rect.name = entity.name;
        this.players.set(entity.name, rect);
      } else {
        existingRect.setPosition(entity.position.x, entity.position.y);
      }
    }
  }

  update() {
  //   // this.render_players(this.entities);
  //   this.renderPlayerSprites();
    

    if (this.keyD?.isDown) {
      this.room?.send('req_action', 3);
    }

  //   if (this.player) {
  //     let isAttacking = false;
  //     let isMoving = false;
  //     let isJumping = false;

  //     if (this.keyA?.isDown) {
  //       this.player.setFlipX(true);
  //       this.player.play('chuckRun', true);
  //       this.player.setVelocityX(-160);
  //       isMoving = true;
  //     } else if (this.keyD?.isDown) {
  //       this.player.setFlipX(false);
  //       this.player.play('chuckRun', true);
  //       this.player.setVelocityX(160);
  //       isMoving = true;
  //     } else {
  //       this.player.setVelocityX(0);
  //     }
  //     if (this.keyJ?.isDown) {
  //       this.player.play('chuckAttack1', true);
  //       isAttacking = true;
  //     } else if (this.keyK?.isDown) {
  //       this.player.play('chuckAttack2', true);
  //       isAttacking = true;
  //     } else if (this.keyL?.isDown) {
  //       this.player.play('chuckAttack3', true);
  //       isAttacking = true;
  //     } else if (this.keyW?.isDown || this.keySpace?.isDown && this.player.body.touching.down) {
  //       this.player.play('chuckJump');
  //       this.player.setVelocityY(-160);
  //       isJumping = true;
  //     } else if (this.keyS?.isDown) {
  //       this.player.play('chuckClimb');
  //       this.player.setVelocityY(160);
  //     }
  //     if (!isAttacking && !isMoving && !isJumping) {
  //       this.player.play('chuckIdle', true);
  //     }
  //   }
  }
}
