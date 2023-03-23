import Phaser, { Loader } from 'phaser';
import { Client } from 'colyseus.js';
import GameEntity from '../../../server/game/GameEntity';
import { ServerMatch } from '../../../server/rooms/schema/ServerMatch';
import chuckIdle from '../../assets/heroes/chuck/spritesheets/Biker_idle.png';

export default class ClientMatch extends Phaser.Scene {
  private client?: Client;
  private entities: Map<string, GameEntity> = new Map<string, GameEntity>();
  private players: Map<string, Phaser.GameObjects.Rectangle> = new Map<string, Phaser.GameObjects.Rectangle>();
  private player?: Phaser.Physics.Arcade.Sprite;
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

  init() {}

  preload() {
    //load images from assets folder
    //this.load.spritesheet('chuck-idle', chuckIdle, { frameWidth: 48, frameHeight: 48 });
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

    // this.player = this.physics.add.sprite(100, 450, 'chuck-idle');
    // this.player.setCollideWorldBounds(true);
    // this.player.setBounce(0.2);

    // this.anims.create({
    //   key: 'idle',
    //   frames: this.anims.generateFrameNumbers('chuck-idle', { start: 0, end: 3 }),
    //   frameRate: 8,
    //   repeat: -1,
    // });

    // this.player.anims.play('idle', true);
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
    this.render_players(this.entities);
  }
}
