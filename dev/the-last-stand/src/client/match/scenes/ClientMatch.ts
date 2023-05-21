import Phaser from 'phaser';
import { Client, Room } from 'colyseus.js';
import { MatchState } from '../../../server/rooms/states/MatchState';
import spriteSheetsLoader from './spritesheetsLoader';
import { capitalizeFirstLetter } from '../../../utils/text_format';
import { IGameEntityMapper } from '../../../typescript/interfaces/IGameEntityMapper';
import GameEntityFactory from '../GameEntityFactory';
import { IHitbox } from '../../../typescript/interfaces/IHitbox';
import INewhudplayer from '../../../typescript/interfaces/INewHudPlayer';
import IUpdatePercentagesMessage from '../../../typescript/interfaces/IUpdatePercentagesMessage';
import { EMessage } from '../../../typescript/enumerations/EMessage';
import { IPlayerDeadMessage } from '../../../typescript/interfaces/IPlayerDeadMessage';
import { IUpdateSpriteMessage } from '../../../typescript/interfaces/IUpdateSpriteMessage';
import { ERooms } from '../../../typescript/enumerations/ERooms';
import HashMap from '../../../utils/data_structures/HashMap';
import PhaserPlayerEntityFactory from '../PhaserPlayerEntityFactory';

interface MovePlayerMessage {
  x: number;
  y: number;
  anim?: string;
  flipX?: boolean;
  direction?: string;
}

interface GenerateAttackHitboxMessage {
  attackType: string;
  attackerWidth: number;
  attackerHeight: number;
  direction: string;
  x: number;
  y: number;
}

const baseSpeedHandler: Record<string, number> = {
  chuck: 1000,
  solana: 500,
  sirius: 150,
  logan: 1500,
};

const airborneSpeedHandler: Record<string, number> = {
  chuck: 500,
  solana: 1000,
  sirius: 150,
  logan: 300,
};

const jumpHeightHandler: Record<string, number> = {
  chuck: 800,
  solana: 800,
  sirius: 1500,
  logan: 1200,
};

const weightHandler: Record<string, number> = {
  chuck: 200,
  solana: 300,
  sirius: 300,
  logan: 600,
};

const maxJumpHandler: Record<string, number> = {
  chuck: 2,
  solana: 2,
  sirius: 2,
  logan: 2,
};

const bounceHandler: Record<string, number> = {
  chuck: 0.1,
  solana: 0.1,
  sirius: 0.1,
  logan: 0.1,
};

// Create doc for the interface IParticlesEmitterJsonObject

interface IParticlesEmitterJsonObject {
  frame: string[];
  lifespan: number;
  speed: { min: number; max: number };
  scale: { start: number; end: number };
  gravityY: number;
  blendMode: string;
  emitting: boolean;
}

const fixedAnimations: string[] = ['Jump', 'DoubleJump', 'Attack1', 'Attack2', 'Attack3', 'Hurt', 'Death'];

export default class ClientMatch extends Phaser.Scene {
  private gameClient?: Client;
  private playerId?: string;
  private gameEntities: HashMap<string, any> = new HashMap<string, any>();
  private hitBoxes: HashMap<string, any> = new HashMap<string, any>();
  private opponentIds: string[] = [];
  private mo: Room | undefined;
  private spriteSheetsLoader = spriteSheetsLoader;
  private updateSpriteMessage?: MovePlayerMessage;
  private background?: Phaser.GameObjects.Image;
  private airborneCorrection: number = 10;
  private gameEntityFactory: GameEntityFactory = new GameEntityFactory();
  private particlesEmitter?: Phaser.GameObjects.Particles.ParticleEmitter;
  private phaserPlayerEntityFactory: PhaserPlayerEntityFactory | undefined;

  // TOUTES LES KEYS
  private keys?: any;

  constructor() {
    super('canvas');
  }

  disablePlayerSprite(playerSprite: any, x: number, y: number) {
    if (playerSprite) {
      playerSprite.body!.enable = false;
      playerSprite.setPosition(x, y);
      playerSprite.setVisible(false);
      playerSprite.setActive(false);
      playerSprite.playerNameText.setVisible(false);
      // playerSprite.setEnable(false)
    }
  }
  enablePlayerSprite(playerSprite: any) {
    if (playerSprite) {
      playerSprite.setVisible(true);
      playerSprite.setActive(true);
      playerSprite.body!.enable = true;
      playerSprite.playerNameText.setVisible(true);
      playerSprite.isAlive = true;
      // playerSprite.setEnable(true)
    }
  }

  respawnPlayerSprite(playerSprite: any) {
    if (playerSprite) {
      playerSprite.alpha = 0.5;
      playerSprite.setVisible(true);

      let flashTimer = this.time.addEvent({
        delay: 100,
        callback: () => {
          playerSprite.alpha = playerSprite.alpha === 0.5 ? 1 : 0.5; //toggle alpha
        },
        callbackScope: this,
        loop: true,
      });

      this.time.addEvent({
        delay: 3000,
        callback: () => {
          playerSprite.alpha = 1;
          flashTimer.remove();
          this.enablePlayerSprite(playerSprite);
        },
        callbackScope: this,
      });
      // enable player sprite
    }
  }

  applyAirborneAnimCorrection(entity: any, groundedAnim: string, airborneAnim: string) {
    if (!entity.body.blocked.down) {
      entity.airborneCount += 1;
      if (entity.airborneCount >= this.airborneCorrection) {
        entity.anim = `${entity.name}${airborneAnim}`;
      } else {
        entity.anim = `${entity.name}${groundedAnim}`;
      }
    } else {
      entity.airborneCount = 0;
    }
  }

  preload() {
    // LOAD DES SPRITESHEETS AVEC LE SPRITESHEETLOADER
    this.spriteSheetsLoader.forEach((spritePaths) => {
      const spriteSheetPaths = Object.values(spritePaths.spriteSheets);
      spriteSheetPaths.forEach((key) => {
        const spriteSheetName = `${spritePaths.heroName}${key.key}`.split(' ').join('');  
        this.load.spritesheet({ key: spriteSheetName, url: key.path, frameConfig: { frameWidth: key.frameWidth, frameHeight: key.frameHeight } });
      });
    });

    // Load backgrounds and tiles
    this.load.image('background', '/assets/backgrounds/background.png');
    this.load.image('tuile03', '/assets/tiles/IndustrialTile_03.png');

    // Load particles
    this.load.atlas('flares', '/assets/particles/flares.png', '/assets/particles/flares.json');
    this.load.image('purple_spark', '/assets/particles/purple_sparkle.png');
  }

  // Get the client from the Boostrap scene
  async create(data: any) {
    const client = data.client;
    this.gameClient = client;
    if (!this.gameClient) throw new Error('client not found');

    // if there is no one in the room, use joinOrCreate or it will throw an error
    this.mo = await this.gameClient.joinOrCreate<MatchState>(ERooms.GameRoom.toString(), { maxClients: 2 });

    this.phaserPlayerEntityFactory = new PhaserPlayerEntityFactory(this.physics, this);

    //  TOUTES LES KEYS DES MOUVEMENTS
    this.keys = this.input.keyboard?.addKeys('W,A,S,D,J,K,L,U,I,O,SPACE,UP,DOWN,LEFT,RIGHT');

    //  CREATION DES ANIMATIONS AVEC LES SPRITESHEETS DU SPRITESHEET LOADER
    this.spriteSheetsLoader.forEach((spritePaths) => {
      const spriteSheetPaths = Object.values(spritePaths.spriteSheets);
      spriteSheetPaths.forEach((key) => {
        const animKey = `${spritePaths.heroName}${key.key}`.toLowerCase();
        this.anims.create({
          key: animKey,
          frames: this.anims.generateFrameNumbers(animKey, { start: key.startFrame, end: key.endFrame }),
          frameRate: key.frameRate,
          repeat: key.repeat,
        });
      });
    });

    // CREATION DES PARTICULES
    const flaresParticlesConfig: IParticlesEmitterJsonObject = {
      frame: ['red', 'blue', 'green', 'yellow', 'white'],
      lifespan: 1000,
      speed: { min: 0, max: 250 },
      scale: { start: 2, end: 0 },
      gravityY: 50,
      blendMode: 'ADD',
      emitting: false,
    };
    this.particlesEmitter = this.add.particles(0, 0, 'flares', flaresParticlesConfig);

    //  CREATION DU BACKGROUND ET DU TUILAGE
    // Background
    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    // stretch the background to fit the whole screen
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;
    this, this.background.setDepth(-1);

    // Create platforms
    const platforms = this.physics.add.staticGroup();
    const walls = this.physics.add.staticGroup();

    // create a platform with the platform builder
    const platform1 = this.add.tileSprite(this.sys.canvas.width * 0.51, this.sys.canvas.height * 0.36, this.sys.canvas.width * 0.26, 32, 'tuile03');
    const platform2 = this.add.tileSprite(this.sys.canvas.width * 0.3, this.sys.canvas.height * 0.75, this.sys.canvas.width * 0.22, 32, 'tuile03');
    const platform3 = this.add.tileSprite(this.sys.canvas.width * 0.75, this.sys.canvas.height * 0.75, this.sys.canvas.width * 0.22, 32, 'tuile03');
    //const wall1 = this.add.tileSprite(this.sys.canvas.width * 0.51, this.sys.canvas.height * 0.185, 36, this.sys.canvas.height * 0.3, 'tuile03');
    this.physics.add.existing(platform1, true);
    this.physics.add.existing(platform2, true);
    this.physics.add.existing(platform3, true);
    //this.physics.add.existing(wall1, true);

    platforms.add(platform1);
    platforms.add(platform2);
    platforms.add(platform3);

    //walls.add(wall1);
    // adjust the scale of the platform
    //platform.setScale(2);

    this.mo.onMessage(EMessage.AssignPlayerID, (message: { id: string }) => {
      this.playerId = message.id;
    });

    this.mo.onMessage(EMessage.AddOpponentID, (message: { id: string }) => {
      this.opponentIds.push(message.id);
    });

    this.mo.onMessage(EMessage.CreateHitbox, (message: IHitbox) => {
      if (message.gameEntityType == 'rectangle') {
        const entity = this.gameEntityFactory.produce('rectangle', { x: message.position.x, y: message.position.y });
        const rect = this.add.rectangle(message.position.x, message.position.y, entity.size.width, entity.size.height);
        this.physics.add.existing(rect, true);
        this.hitBoxes.set(entity.id.toString(), rect);
        rect.setData('owner', message.owner);
        rect.setData('timer', 0);
        rect.setData('lifespan', 1);
        this.mo?.state.playerIds.forEach((playerId: string) => {
          if (playerId !== rect.getData('owner')) {
            this.physics.add.overlap(rect, this.gameEntities.get(playerId), () => {
              const attackVector = new Phaser.Math.Vector2(this.gameEntities.get(playerId)?.x! - rect.x, this.gameEntities.get(playerId)?.y! - rect.y).normalize();
              const attackForce = attackVector.scale(1000);
              this.mo?.send(EMessage.PlayerHurt, { victim: playerId, attackForce: { x: attackForce.x, y: attackForce.y } });
              return true;
            });
          }
        });
      }
    });

    this.mo.onMessage(EMessage.PlayerHurt, (message) => {
      const { attackForce } = message;
      const hero = this.gameEntities.get(this.playerId!);
      hero.anim = hero.name + 'Hurt';
      hero.setVelocity(attackForce.x, attackForce.y);

      hero.damagePercentage += 1;
      const updatePlayerDamage: IUpdatePercentagesMessage = { playerNameOrID: this.playerId!, damagePercentage: hero.damagePercentage };

      this.mo?.send(EMessage.ServerUpdateHudDamage, updatePlayerDamage);
    });

    this.mo.onMessage(EMessage.CreateEntity, (message: IGameEntityMapper) => {
      // const phaserPlayerEntity = new PhaserPlayerEntity(this.physics, this);
      message.staticgroup = [platforms, walls]
      // phaserPlayerEntity.create(message);
      const phaserPlayerEntity = this.phaserPlayerEntityFactory?.createHero(message);
      this.gameEntities.set(message.id, phaserPlayerEntity);
      const entity = this.gameEntities.get(message.id).sprite;
      console.log(this.gameEntities.get(message.id))
      // this.physics.add.existing(entity, false);
      // entity.setName(message.gameEntityType);
      // entity.setBounce(bounceHandler[message.gameEntityType]);
      // entity.setGravityY(weightHandler[message.gameEntityType]);
      // entity.setScale(2);
      console.log(entity)
      // console.log(entity.anims)
      // entity.baseSpeed = baseSpeedHandler[message.gameEntityType];
      // entity.airborneSpeed = airborneSpeedHandler[message.gameEntityType];
      // entity.jumpHeight = jumpHeightHandler[message.gameEntityType];
      // entity.direction = message.direction;
      // entity.id = message.id;
      // entity.jumpCount = 0;
      // entity.airborneCount = 0;
      // entity.maxJump = maxJumpHandler[message.gameEntityType];
      // entity.damagePercentage = 0;
      // entity.frameEvents = {};
      // entity.isAlive = true;
      // entity.lives = 3;
      this.spriteSheetsLoader
        .find((spritePaths) => spritePaths.heroName === message.gameEntityType)
        ?.spriteSheets.forEach((spritesheet) => {
          entity.frameEvents[spritesheet.key] = spritesheet.frameEvents;
          const animKey = `${message.gameEntityType}${spritesheet.key}`.toLowerCase();
          entity.anims.create({
            key: animKey,
            frames: entity.anims.generateFrameNumbers(animKey, { start: spritesheet.startFrame, end: spritesheet.endFrame  }),
            frameRate: spritesheet.frameRate,
            repeat: spritesheet.repeat,
          });
        });
        entity.anims.play(`${message.gameEntityType}idle`, true);


        // this.spriteSheetsLoader.forEach((spritePaths) => {
        //   const spriteSheetPaths = Object.values(spritePaths.spriteSheets);
        //   spriteSheetPaths.forEach((key) => {
        //     const animKey = `${spritePaths.heroName}${capitalizeFirstLetter(key.key)}`;
        //     this.anims.create({
        //       key: animKey,
        //       frames: this.anims.generateFrameNumbers(animKey, { start: key.startFrame, end: key.endFrame }),
        //       frameRate: key.frameRate,
        //       repeat: key.repeat,
        //     });
        //   });
        // });

      // add player name text and attach it to the player
      entity.playerName = message.id;
      const playerNameText = this.add.text(entity.x, entity.y - 50, entity.playerName, { fontSize: '24px', color: '#000000' });
      playerNameText.setOrigin(0.5, 0.5);
      entity.playerNameText = playerNameText;
    });

    this.mo.onMessage(EMessage.RemoveEntity, (message: { id: string }) => {
      this.gameEntities.get(message.id)?.destroy();
      this.gameEntities.delete(message.id);
    });

    this.mo.onMessage(EMessage.CreateHud, (players: { name: string; index: number }[]) => {
      players.forEach((player: { name: string; index: number }) => {
        const hudNewPlayerMessage: INewhudplayer = {
          name: player.name,
          index: player.index,
          damagePercentage: 0,
          lives: 3,
        };
        this.events.emit(EMessage.NewHudPlayer.toString(), hudNewPlayerMessage);
      });
    });

    this.mo.onMessage(EMessage.ServerUpdateHudDamage, (message: any) => {
      this.events.emit(EMessage.UpdateHudDamage.toString(), message);
    });
    this.mo.onMessage(EMessage.ServerRemoveHudPlayer, (message: any) => {
      this.events.emit(EMessage.RemoveHudPlayer.toString(), message);
    });

    this.mo.onMessage(EMessage.PlayerDead, (message: IPlayerDeadMessage) => {
      const entity = this.gameEntities.get(message.id);
      // set the entity to invisible and remove it from the physics world
      if (entity) {
        this.particlesEmitter?.explode(75, message.explosionPosition.x, message.explosionPosition.y);
        this.disablePlayerSprite(entity, message.respawnPosition!.x, message.respawnPosition!.y);
        entity.lives -= 1;
        this.events.emit(EMessage.UpdateHudLives.toString(), { name: message.id, lives: entity.lives });
        this.mo?.send(EMessage.RespawnPlayer, { id: message.id });
        // this.enablePlayerSprite(entity);
        this.respawnPlayerSprite(entity);
      }
    });
  }

  update() {
    // le key down qui envoie l action pour le set velocity
    if (this.keys && this.mo?.state.gem.get(this.playerId)) {
      const entity = this.gameEntities.get(this.playerId!).sprite;

      const animKey = entity.anims.currentAnim.key.split(entity.name)[1];
      const canvasHeight: number = this.game.config.height as number;
      const spriteBottom = entity.y + entity.height;
      const bounceCorrection = 10;
      const keyboardPressed = this.keys.A?.isDown || this.keys.W?.isDown || this.keys.S?.isDown || this.keys.D?.isDown || this.keys.J?.isDown || this.keys.K?.isDown || this.keys.L?.isDown || this.keys.U?.isDown || this.keys.I?.isDown || this.keys.O?.isDown || this.keys.SPACE?.isDown || this.keys.UP?.isDown || this.keys.DOWN?.isDown || this.keys.LEFT?.isDown || this.keys.RIGHT?.isDown;
      const jumping = Phaser.Input.Keyboard.JustDown(this.keys.W) || Phaser.Input.Keyboard.JustDown(this.keys.UP) || Phaser.Input.Keyboard.JustDown(this.keys.SPACE);
      const attacking = Phaser.Input.Keyboard.JustDown(this.keys.J) || Phaser.Input.Keyboard.JustDown(this.keys.K) || Phaser.Input.Keyboard.JustDown(this.keys.L);

      if (spriteBottom >= canvasHeight - bounceCorrection) {
        entity.body.blocked.down = true;
      }
      if (entity.body.blocked.down) {
        entity.jumpCount = 0;
      }

      if (entity.anim != `${entity.name}hurt`) {
        // Input logic
        if (keyboardPressed) {
          // Jumping logic
          if (jumping) {
            if (entity.jumpCount < entity.maxJump) {
              entity.setVelocityY(-entity.jumpHeight);
              if (entity.jumpCount == 0) {
                entity.anim = `${entity.name}jump`;
              } else if (entity.jumpCount >= 1) {
                entity.anim = `${entity.name}doublejump`;
              }
              entity.jumpCount += 1;
            } else if (entity.jumpCount >= entity.maxJump) {
              entity.anim = `${entity.name}fall`;
            }
          }
          // Moving logic
          if (this.keys.D?.isDown || this.keys.RIGHT?.isDown || this.keys.A?.isDown || this.keys.LEFT?.isDown || this.keys.S?.isDown || this.keys.DOWN?.isDown) {
            if ((this.keys.A?.isDown && this.keys.D?.isDown) || (this.keys.LEFT?.isDown && this.keys.RIGHT?.isDown)) {
              if (entity.body.blocked.down) {
                entity.anim = `${entity.name}idle`;
              } else {
                entity.anim = `${entity.name}fall`;
              }
              entity.setVelocityX(0);
            } else if (this.keys.D?.isDown || this.keys.RIGHT?.isDown) {
              entity.body.blocked.down ? entity.setVelocityX(entity.baseSpeed) : entity.setVelocityX(entity.airborneSpeed);
              entity.direction = 'right';
            } else if (this.keys.A?.isDown || this.keys.LEFT?.isDown) {
              entity.body.blocked.down ? entity.setVelocityX(-entity.baseSpeed) : entity.setVelocityX(-entity.airborneSpeed);
              entity.direction = 'left';
            } else if (this.keys.S?.isDown || this.keys.DOWN?.isDown) {
              entity.setVelocity(0, entity.airborneSpeed + entity.weight);
            }
            if (entity.anim !== `${entity.name}jump` && entity.anim !== `${entity.name}doubleJump`) {
              this.applyAirborneAnimCorrection(entity, 'run', 'fall');
            }
          }
          // Attacking logic
          if (attacking && entity.body.blocked.down) {
            if (!fixedAnimations.includes(animKey)) {
              if (this.keys.J?.isDown) {
                entity.anim = `${entity.name}attack1`;
              } else if (this.keys.K?.isDown) {
                entity.anim = `${entity.name}attack2`;
              } else if (this.keys.L?.isDown) {
                entity.anim = `${entity.name}attack3`;
              }
            }
          }
        }
        // Idle logic
        else {
          if (!fixedAnimations.includes(animKey)) {
            entity.setVelocityX(0);

            this.applyAirborneAnimCorrection(entity, 'idle', 'fall');
          }
        }
      }

      if (entity.isAlive) {
        if (entity.x > this.sys.canvas.width * 1.2 || entity.x < 0 - this.sys.canvas.width * 0.2 || entity.y > this.sys.canvas.height * 1.2 || entity.y < 0 - this.sys.canvas.height * 0.2) {
          let explosionPosition = { x: 0, y: 0 };
          if (entity.x > this.sys.canvas.width * 1.2) {
            explosionPosition = { x: entity.x - (entity.x - this.sys.canvas.width), y: entity.y };
            entity.isAlive = false;
          } else if (entity.x < 0 - this.sys.canvas.width * 0.2) {
            explosionPosition = { x: 0, y: entity.y };
            entity.isAlive = false;
          } else if (entity.y > this.sys.canvas.height * 1.2) {
            explosionPosition = { x: entity.x, y: entity.y - (entity.y - this.sys.canvas.height) };
            entity.isAlive = false;
          } else if (entity.y < 0 - this.sys.canvas.height * 0.2) {
            explosionPosition = { x: entity.x, y: 0 };
            entity.isAlive = false;
          }

          if (!entity.isAlive) {
            // hide and disable the sprite
            const playerDeadMessage: IPlayerDeadMessage = { id: entity.id, explosionPosition: explosionPosition };
            this.mo.send(EMessage.PlayerDead, playerDeadMessage);
          }
        }
      }

      // Send the sprite's information to the server
      const updateSpriteMessage: IUpdateSpriteMessage = {
        x: entity.x,
        y: entity.y,
        direction: entity.direction,
        anim: entity.anim.toLowerCase(),
      };

      this.mo.send(EMessage.UpdateSprite, updateSpriteMessage);

      //Render all the sprites
      this.mo.state.gem.forEach((gem: IGameEntityMapper, key: string) => {
        const entity = this.gameEntities.get(key).sprite;
        const animKey = gem.anim?.split(gem.gameEntityType)[1];
        let flipX;

        if (entity) {
          entity.setPosition(gem.position.x, gem.position.y);

          if (gem.direction == 'left') {
            flipX = true;
          } else if (gem.direction == 'right') {
            flipX = false;
          }
          entity.setFlipX(flipX);
          // console.log(gem.anim)
          // entity.anims.play(gem.anim, true);

          // wait for fixed animations do be finished before playing other animations
          if (fixedAnimations.includes(animKey!)) {
            if (animKey == 'hurt') {
              entity.once('animationcomplete', () => {
                entity.anim = `${gem.gameEntityType}Idle`;
              });
            } else if (animKey == 'attack1' || animKey == 'attack2' || animKey == 'attack3') {
              // Send an attack's information to the server
              entity.on('animationupdate', (anim: any, frame: any, sprite: any, frameKey: any) => {
                if (anim.key.split(gem.gameEntityType)[1] === animKey && entity.frameEvents[animKey.toLowerCase()]?.includes(frame.index)) {
                  if (entity.id == this.playerId) {
                    const createAttackHitboxMessage = {
                      entityType: 'rectangle',
                      attackerWidth: entity.width,
                      attackerHeight: entity.height,
                      position: { x: entity.x, y: entity.y },
                    };
                    this.mo?.send(EMessage.CreateHitbox, createAttackHitboxMessage);
                  }
                }
              });
            }

            // Set the animation to idle or fall after the fixed animation is finished
            entity.once('animationcomplete', () => {
              if (animKey == 'Attack1' || animKey == 'attack2' || animKey == 'attack3') {
                entity.anim = `${gem.gameEntityType}idle`;
              } else {
                entity.anim = `${gem.gameEntityType}iall`;
              }
            });
          }
          // Remove the attack hitbox as soon as the hitbox is present for an iteration
          for (let [key, value] of this.hitBoxes) {
            if (value.type.toLowerCase() === 'rectangle') {
              value.setData('timer', value.getData('timer') + 1);
              if (value.getData('timer') > value.getData('lifespan')) {
                this.mo?.send(EMessage.RemoveAttackHitbox, { id: key });
              }
            }
          }
          // update the player name text position
          const playerName = entity.playerNameText;
          if (playerName) {
            playerName.setPosition(entity.x, entity.y - 50);
          }
        }
      });
    }
  }
}
