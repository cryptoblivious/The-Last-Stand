import { IHeroesSpritePaths } from '../../../typescript/interfaces/IHeroesSpritesPaths';
import chuckIdlePath from '../../assets/heroes/chuck/spritesheets/chuck_idle.png'
import chuckRunPath from '../../assets/heroes/chuck/spritesheets/chuck_run.png'
import chuckJumpPath from '../../assets/heroes/chuck/spritesheets/chuck_jump.png'
import chuckAttackPath1 from '../../assets/heroes/chuck/spritesheets/chuck_attack_1.png'
import chuckAttackPath2 from '../../assets/heroes/chuck/spritesheets/chuck_attack_2.png'
import chuckAttackPath3 from '../../assets/heroes/chuck/spritesheets/chuck_attack_3.png'
import chuckClimbPath from '../../assets/heroes/chuck/spritesheets/chuck_climb.png'
import chuckDeathPath from '../../assets/heroes/chuck/spritesheets/chuck_death.png'
import chuckHurtPath from '../../assets/heroes/chuck/spritesheets/chuck_hurt.png'
import chuckDoubleJumpPath from '../../assets/heroes/chuck/spritesheets/chuck_doublejump.png'
import chuck_kickPath from '../../assets/heroes/chuck/spritesheets/chuck_kick.png'
import chuckRunAttackPath from '../../assets/heroes/chuck/spritesheets/chuck_run_attack.png'

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
                path: chuck_kickPath,
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
        ]
    }
]
export default spriteSheetsLoader;