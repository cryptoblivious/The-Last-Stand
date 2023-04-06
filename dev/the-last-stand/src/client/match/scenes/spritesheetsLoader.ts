// import { IHeroesSpritePaths } from '../../../typescript/interfaces/IHeroesSpritesPaths';
// import chuckIdlePath from '../../assets/heroes/chuck/spritesheets/chuck_idle.png';
// import chuckRunPath from '../../assets/heroes/chuck/spritesheets/chuck_run.png';
// import chuckJumpPath from '../../assets/heroes/chuck/spritesheets/chuck_jump.png';
// import chuckAttackPath1 from '../../assets/heroes/chuck/spritesheets/chuck_attack_1.png';
// import chuckAttackPath2 from '../../assets/heroes/chuck/spritesheets/chuck_attack_2.png';
// import chuckAttackPath3 from '../../assets/heroes/chuck/spritesheets/chuck_attack_3.png';
// import chuckClimbPath from '../../assets/heroes/chuck/spritesheets/chuck_climb.png';
// import chuckDeathPath from '../../assets/heroes/chuck/spritesheets/chuck_death.png';
// import chuckHurtPath from '../../assets/heroes/chuck/spritesheets/chuck_hurt.png';
// import chuckDoubleJumpPath from '../../assets/heroes/chuck/spritesheets/chuck_doublejump.png';
// import chuckKickPath from '../../assets/heroes/chuck/spritesheets/chuck_kick.png';
// import chuckRunAttackPath from '../../assets/heroes/chuck/spritesheets/chuck_run_attack.png';

// import solanaIdlePath from '../../assets/heroes/solana/spritesheets/solana_idle.png';
// import solanaRunPath from '../../assets/heroes/solana/spritesheets/solana_run.png';
// import solanaJumpPath from '../../assets/heroes/solana/spritesheets/solana_jump.png';
// import solanaAttackPath1 from '../../assets/heroes/solana/spritesheets/solana_attack_1.png';
// import solanaAttackPath2 from '../../assets/heroes/solana/spritesheets/solana_attack_2.png';
// import solanaAttackPath3 from '../../assets/heroes/solana/spritesheets/solana_attack_3.png';
// import solanaClimbPath from '../../assets/heroes/solana/spritesheets/solana_climb.png';
// import solanaDeathPath from '../../assets/heroes/solana/spritesheets/solana_death.png';
// import solanaHurtPath from '../../assets/heroes/solana/spritesheets/solana_hurt.png';
// import solanaDoubleJumpPath from '../../assets/heroes/solana/spritesheets/solana_doublejump.png';
// import solanaPunchPath from '../../assets/heroes/solana/spritesheets/solana_punch.png';
// import solanaRunAttackPath from '../../assets/heroes/solana/spritesheets/solana_run_attack.png';

// const spriteSheetsLoader: IHeroesSpritePaths[] = [
//   {
//     heroName: 'chuck',
//     spriteSheets: [
//       {
//         key: 'idle',
//         path: chuckIdlePath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 3,
//         frameRate: 8,
//         repeat: -1,
//       },
//       {
//         key: 'run',
//         path: chuckRunPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: -1,
//       },
//       {
//         key: 'jump',
//         path: chuckJumpPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 3,
//         frameRate: 8,
//         repeat: 0,
//       },
//       {
//         key: 'attack1',
//         path: chuckAttackPath1,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 8,
//         repeat: 0,
//       },
//       {
//         key: 'attack2',
//         path: chuckAttackPath2,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 7,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'attack3',
//         path: chuckAttackPath3,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 7,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'climb',
//         path: chuckClimbPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: -1,
//       },
//       {
//         key: 'death',
//         path: chuckDeathPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'hurt',
//         path: chuckHurtPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 1,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'doublejump',
//         path: chuckDoubleJumpPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'kick',
//         path: chuckKickPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'runAttack',
//         path: chuckRunAttackPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: 0,
//       },
//     ],
//   },
//   {
//     heroName: 'solana',
//     spriteSheets: [
//       {
//         key: 'idle',
//         path: solanaIdlePath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 3,
//         frameRate: 8,
//         repeat: -1,
//       },
//       {
//         key: 'run',
//         path: solanaRunPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: -1,
//       },
//       {
//         key: 'jump',
//         path: solanaJumpPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 3,
//         frameRate: 8,
//         repeat: 0,
//       },
//       {
//         key: 'attack1',
//         path: solanaAttackPath1,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 8,
//         repeat: 0,
//       },
//       {
//         key: 'attack2',
//         path: solanaAttackPath2,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 7,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'attack3',
//         path: solanaAttackPath3,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 7,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'climb',
//         path: solanaClimbPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: -1,
//       },
//       {
//         key: 'death',
//         path: solanaDeathPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'hurt',
//         path: solanaHurtPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 1,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'doublejump',
//         path: solanaDoubleJumpPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'punch',
//         path: solanaPunchPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: 0,
//       },
//       {
//         key: 'runAttack',
//         path: solanaRunAttackPath,
//         frameWidth: 48,
//         frameHeight: 48,
//         startFrame: 0,
//         endFrame: 5,
//         frameRate: 10,
//         repeat: 0,
//       },
//     ],
//   },
// ];
// export default spriteSheetsLoader;
