import { IHeroesSpritePaths } from '../../../typescript/interfaces/IHeroesSpritesPaths';
import chuckIdlePath from '../../assets/heroes/chuck/spritesheets/chuck_idle.png'
import chuckRunPath from '../../assets/heroes/chuck/spritesheets/chuck_run.png'

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
                endFrame: 3,
                frameRate: 10,
                repeat: -1,
            },
        ]
    }

]
export default spriteSheetsLoader;