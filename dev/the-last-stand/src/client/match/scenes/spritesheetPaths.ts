import { IHeroesSpritePaths } from '../../../typescript/interfaces/IHeroesSpritesPaths';
import chuckIdleRightPath from '../../assets/heroes/chuck/spritesheets/Biker_idle.png'
import chuckRunRightPath from '../../assets/heroes/chuck/spritesheets/Biker_run.png'
// Want to create a Record that will hold the paths to the spritesheets:

const spriteSheetsLoader: IHeroesSpritePaths[] = [
    {
        heroName: 'chuck',
        spriteSheets: [
            {
                key: 'idleRight',
                path: chuckIdleRightPath,
                frameWidth: 48,
                frameHeight: 48,
                startFrame: 0,
                endFrame: 3,
                frameRate: 8,
                repeat: -1,
            },
            {
                key: 'runRight',
                path: chuckRunRightPath,
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