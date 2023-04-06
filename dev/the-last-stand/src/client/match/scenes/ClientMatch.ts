import { IHeroesSpritePaths } from '../../../typescript/interfaces/IHeroesSpritesPaths';
import chuckIdlePath from '../../assets/heroes/chuck/spritesheets/chuck_idle.png';
import chuckRunPath from '../../assets/heroes/chuck/spritesheets/chuck_run.png';
import chuckJumpPath from '../../assets/heroes/chuck/spritesheets/chuck_jump.png';
import chuckAttackPath1 from '../../assets/heroes/chuck/spritesheets/chuck_attack_1.png';
import chuckAttackPath2 from '../../assets/heroes/chuck/spritesheets/chuck_attack_2.png';
import chuckAttackPath3 from '../../assets/heroes/chuck/spritesheets/chuck_attack_3.png';
import chuckClimbPath from '../../assets/heroes/chuck/spritesheets/chuck_climb.png';
import chuckDeathPath from '../../assets/heroes/chuck/spritesheets/chuck_death.png';
import chuckHurtPath from '../../assets/heroes/chuck/spritesheets/chuck_hurt.png';
import chuckDoubleJumpPath from '../../assets/heroes/chuck/spritesheets/chuck_doublejump.png';
import chuckKickPath from '../../assets/heroes/chuck/spritesheets/chuck_kick.png';
import chuckRunAttackPath from '../../assets/heroes/chuck/spritesheets/chuck_run_attack.png';

import solanaIdlePath from '../../assets/heroes/solana/spritesheets/solana_idle.png';
import solanaRunPath from '../../assets/heroes/solana/spritesheets/solana_run.png';
import solanaJumpPath from '../../assets/heroes/solana/spritesheets/solana_jump.png';
import solanaAttackPath1 from '../../assets/heroes/solana/spritesheets/solana_attack_1.png';
import solanaAttackPath2 from '../../assets/heroes/solana/spritesheets/solana_attack_2.png';
import solanaAttackPath3 from '../../assets/heroes/solana/spritesheets/solana_attack_3.png';
import solanaClimbPath from '../../assets/heroes/solana/spritesheets/solana_climb.png';
import solanaDeathPath from '../../assets/heroes/solana/spritesheets/solana_death.png';
import solanaHurtPath from '../../assets/heroes/solana/spritesheets/solana_hurt.png';
import solanaDoubleJumpPath from '../../assets/heroes/solana/spritesheets/solana_doublejump.png';
import solanaPunchPath from '../../assets/heroes/solana/spritesheets/solana_punch.png';
import solanaRunAttackPath from '../../assets/heroes/solana/spritesheets/solana_run_attack.png';

import Phaser from 'phaser';
import { Client, Room } from 'colyseus.js';
import GameEntity from '../../../server/game/GameEntity';
import { MatchState } from '../../../server/rooms/schema/MatchState';
//import spriteSheetsLoader from './spritesheetsLoader';
import { capitalizeFirstLetter } from '../../../utils/text_format';
import { IGameEntityMapper } from '../../../typescript/interfaces/IGameEntityMapper';

const spriteSheetsLoader: IHeroesSpritePaths[] = [
  {
    heroName: 'chuck',
    spriteSheets: [
      {
        key: 'idle',
        path: chuckIdlePath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 3,
        frameRate: 8,
        repeat: -1,
      },
      {
        key: 'run',
        path: chuckRunPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: -1,
      },
      {
        key: 'jump',
        path: chuckJumpPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 3,
        frameRate: 8,
        repeat: 0,
      },
      {
        key: 'attack1',
        path: chuckAttackPath1,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 8,
        repeat: 0,
      },
      {
        key: 'attack2',
        path: chuckAttackPath2,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 7,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'attack3',
        path: chuckAttackPath3,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 7,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'climb',
        path: chuckClimbPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: -1,
      },
      {
        key: 'death',
        path: chuckDeathPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'hurt',
        path: chuckHurtPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 1,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'doublejump',
        path: chuckDoubleJumpPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'kick',
        path: chuckKickPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'runAttack',
        path: chuckRunAttackPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
    ],
  },
  {
    heroName: 'solana',
    spriteSheets: [
      {
        key: 'idle',
        path: solanaIdlePath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 3,
        frameRate: 8,
        repeat: -1,
      },
      {
        key: 'run',
        path: solanaRunPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: -1,
      },
      {
        key: 'jump',
        path: solanaJumpPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 3,
        frameRate: 8,
        repeat: 0,
      },
      {
        key: 'attack1',
        path: solanaAttackPath1,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 8,
        repeat: 0,
      },
      {
        key: 'attack2',
        path: solanaAttackPath2,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 7,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'attack3',
        path: solanaAttackPath3,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 7,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'climb',
        path: solanaClimbPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: -1,
      },
      {
        key: 'death',
        path: solanaDeathPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'hurt',
        path: solanaHurtPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 1,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'doublejump',
        path: solanaDoubleJumpPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'punch',
        path: solanaPunchPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'runAttack',
        path: solanaRunAttackPath,
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
    ],
  },
];

interface MovePlayerMessage {
  x: number;
  y: number;
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
    this.mo.onStateChange((state: MatchState) => {});

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
  }

  update() {
    // le key down qui envoie l action pour le set velocity
    if (this.keys && this.mo?.state.gem.get(this.playerId)) {
      const entity = this.gameEntities.get(this.playerId!);
      if (entity.body.velocity.y < -10) {
        entity.play(`${entity.name}Jump`, true);
      } else if (this.keys.D?.isDown || this.keys.A?.isDown || this.keys.W?.isDown) {
        if (this.keys.A?.isDown && this.keys.D?.isDown) {
          entity.setVelocityX(0);
          entity.play(`${entity.name}Idle`, true);
        } else if (this.keys.D?.isDown) {
          entity.setFlipX(false);
          entity.setVelocityX(entity.baseSpeed);
          entity.play(`${entity.name}Run`, true);
        } else if (this.keys.A?.isDown) {
          entity.setFlipX(true);
          entity.setVelocityX(-entity.baseSpeed);
          entity.play(`${entity.name}Run`, true);
        }
        if (this.keys.W?.isDown) {
          entity.setVelocityY(-entity.jumpHeight);
        }
      } else {
        entity.setVelocityX(0);
        entity.play(`${entity.name}Idle`, true);
      }

      const movePlayerMessage: MovePlayerMessage = {
        x: entity.x,
        y: entity.y,
      };

      this.mo.send('move_player', movePlayerMessage);

      this.mo.state.gem.forEach((gem: IGameEntityMapper, key: string) => {
        this.gameEntities.get(key)?.setPosition(gem.position.x, gem.position.y);
      });
    }
  }
}
