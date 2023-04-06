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

const spriteSheetsLoader: IHeroesSpritePaths[] = [
  {
    heroName: 'chuck',
    spriteSheets: [
      {
        key: 'idle',
        path: '/assets/heroes/chuck/spritesheets/chuck_idle.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 3,
        frameRate: 8,
        repeat: -1,
      },
      {
        key: 'run',
        path: '/assets/heroes/chuck/spritesheets/chuck_run.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: -1,
      },
      {
        key: 'jump',
        path: '/assets/heroes/chuck/spritesheets/chuck_jump.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 3,
        frameRate: 8,
        repeat: 0,
      },
      {
        key: 'attack1',
        path: '/assets/heroes/chuck/spritesheets/chuck_attack_1.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 8,
        repeat: 0,
      },
      {
        key: 'attack2',
        path: '/assets/heroes/chuck/spritesheets/chuck_attack_2.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 7,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'attack3',
        path: '/assets/heroes/chuck/spritesheets/chuck_attack_3.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 7,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'climb',
        path: '/assets/heroes/chuck/spritesheets/chuck_climb.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: -1,
      },
      {
        key: 'death',
        path: '/assets/heroes/chuck/spritesheets/chuck_death.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'hurt',
        path: '/assets/heroes/chuck/spritesheets/chuck_hurt.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 1,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'doublejump',
        path: '/assets/heroes/chuck/spritesheets/chuck_doublejump.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'kick',
        path: '/assets/heroes/chuck/spritesheets/chuck_kick.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'runAttack',
        path: '/assets/heroes/chuck/spritesheets/chuck_run_attack.png',
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
        path: '/assets/heroes/solana/spritesheets/solana_idle.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 3,
        frameRate: 8,
        repeat: -1,
      },
      {
        key: 'run',
        path: '/assets/heroes/solana/spritesheets/solana_run.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: -1,
      },
      {
        key: 'jump',
        path: '/assets/heroes/solana/spritesheets/solana_jump.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 3,
        frameRate: 8,
        repeat: 0,
      },
      {
        key: 'attack1',
        path: '/assets/heroes/solana/spritesheets/solana_attack_1.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 8,
        repeat: 0,
      },
      {
        key: 'attack2',
        path: '/assets/heroes/solana/spritesheets/solana_attack_2.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 7,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'attack3',
        path: '/assets/heroes/solana/spritesheets/solana_attack_3.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 7,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'climb',
        path: '/assets/heroes/solana/spritesheets/solana_climb.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: -1,
      },
      {
        key: 'death',
        path: '/assets/heroes/solana/spritesheets/solana_death.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'hurt',
        path: '/assets/heroes/solana/spritesheets/solana_hurt.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 1,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'doublejump',
        path: '/assets/heroes/solana/spritesheets/solana_doublejump.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'punch',
        path: '/assets/heroes/solana/spritesheets/solana_punch.png',
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        frameRate: 10,
        repeat: 0,
      },
      {
        key: 'runAttack',
        path: '/assets/heroes/solana/spritesheets/solana_run_attack.png',
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
export default spriteSheetsLoader;
