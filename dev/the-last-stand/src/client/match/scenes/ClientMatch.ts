import Phaser from 'phaser';
import { Client } from 'colyseus.js';
import GameEntity from '../../../server/game/GameEntity';
import { ServerMatch } from '../../../server/rooms/schema/ServerMatch';
import chuckIdle from '../../assets/heroes/chuck/spritesheets/Biker_idle.png'
import spriteSheetsLoader from './spritesheetPaths';
import { capitalizeFirstLetter } from '../../../utils/text_format';

export default class ClientMatch extends Phaser.Scene {
  private client?: Client;
  private entities: Map<string, GameEntity> = new Map<string, GameEntity>();
  private players: Map<string, Phaser.GameObjects.Rectangle> = new Map<string, Phaser.GameObjects.Rectangle>();
  private player: Phaser.GameObjects.Sprite | undefined;
  private spriteSheetsLoader = spriteSheetsLoader;
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
    // this.spriteSheetsLoader.forEach((hero) => {
    //   const { name, paths } = hero;
    //   Object.entries(paths).forEach(([key, value]) => {
    //     const spriteSheetName = `${name}${key}`;
    //     this.load.spritesheet(spriteSheetName, value, { frameWidth: 48, frameHeight: 48 });
    //     console.log(spriteSheetName);
    //   });
    // });
    // this.load.spritesheet('chuckIdle', spriteSheetsLoader.find(hero => hero.name === 'chuck')?.paths.idleRight, { frameWidth: 48, frameHeight: 48 });

    this.spriteSheetsLoader.forEach((spritePaths) => {
      // console.log(spritePaths);
      const spriteSheetPaths = Object.values(spritePaths.spriteSheets);
      spriteSheetPaths.forEach((key) => {
        const spriteSheetName = `${spritePaths.heroName}${ capitalizeFirstLetter(key.key)}`;
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
    const room = await this.client.joinOrCreate<ServerMatch>('match_orchestrator');

    room.onMessage('res_action', (message) => {
      // console.log(message);
    });

    this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
      // translate key to action and send to server
      if (event.key in this.inputHandler) {
        room.send('req_action', this.inputHandler[event.key]);
      }
      // console.log(event.key);
    });

    // // listen to state changes
    room.onStateChange((state: ServerMatch) => {
      this.entities = state.entities;
      // console.log(state);
    });

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
    

    this.player = this.add.sprite(100, 100, 'chuckIdle');

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

    this.player.setScale(2);
    // this.player.play('chuckRun');
    const anims = [ 'chuckIdle', 'chuckRun', 'chuckAttack1', 'chuckAttack2',  'chuckAttack3' ,'chuckJump', 'chuckHurt', 'chuckDeath', 'chuckClimb', 'chuckDoublejump', 'chuckKick', 'chuckRunAttack']
    const duration = 2000;
    let currentIndex = 0
    let rounds = 0;
    this.time.addEvent({
      delay: duration,
      loop: true,
      callback: () => {
        this.player?.play(anims[currentIndex]);
        currentIndex = (currentIndex + 1) % anims.length;
        rounds++;
        if ( rounds % 2) {
          this.player?.setFlipX(!this.player?.flipX);
        }
      } 
      
    });
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
    // this.render_players(this.entities);
  }
}
